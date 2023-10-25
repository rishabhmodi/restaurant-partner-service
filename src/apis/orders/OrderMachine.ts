import { createMachine, interpret } from "xstate";
import KafkaProducer from "../../providers/KafkaProducer";

const orderMachine = createMachine<{ retries: number }>({
  id: "order",
  initial: "created",
  states: {
    created: {
      on: {
        RESTAURANT_ACCEPTED: "order_accepted",
        RESTAURANT_REJECTED: "order_cancelled",
      },
    },
    order_accepted: {
      on: {
        assign_delivery_partner: "delivery_partner_assigned",
      },
    },
    order_cancelled: {
      type: "final",
    },
    undelivered: {
      type: "final",
    },
    delivery_partner_assigned: {
      on: {
        order_picked_up: "order_on_the_way",
      },
    },
    order_on_the_way: {
      on: {
        delivered: "delivered",
        undelivered: "undelivered",
      },
    },
    delivered: {
      type: "final",
    },
  },
});

const producer = new KafkaProducer();
const OrderMachineService = interpret(orderMachine)
  .onTransition((state, payload) => {
    switch (state.value) {
      case "created": {
        producer.produceMessage("order-stream", payload);
        break;
      }
    }
  })
  .start();

export { OrderMachineService };
