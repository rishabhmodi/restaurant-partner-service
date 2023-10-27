import { createMachine, interpret } from "xstate";
import KafkaProducer from "../../providers/KafkaProducer";
import OrderService from "./OrderService";
import OrderController from "./OrderController";

export enum OrderState {
  CREATED = "created",
  ORDER_ACCEPTED = "order_accepted",
  ORDER_CANCELLED = "order_cancelled",
  DELIVERY_PARTNER_ASSIGNED = "delivery_partner_assigned",
  UNDELIVERED = "undelivered",
  DELIVERED = "delivered",
  ORDER_ON_THE_WAY = "order_on_the_way",
}

const orderMachine = createMachine<{ retries: number }>({
  id: "order",
  initial: OrderState.CREATED,
  states: {
    [OrderState.CREATED]: {
      on: {
        restaurant_accepted: OrderState.ORDER_ACCEPTED,
        restaurant_rejected: OrderState.ORDER_CANCELLED,
      },
    },
    [OrderState.ORDER_ACCEPTED]: {
      on: {
        delivery_partner_assigned: OrderState.DELIVERY_PARTNER_ASSIGNED,
      },
    },
    [OrderState.ORDER_CANCELLED]: {
      type: "final",
    },
    [OrderState.UNDELIVERED]: {
      type: "final",
    },
    [OrderState.DELIVERY_PARTNER_ASSIGNED]: {
      on: {
        order_picked_up: OrderState.ORDER_ON_THE_WAY,
      },
    },
    [OrderState.ORDER_ON_THE_WAY]: {
      on: {
        delivered: OrderState.DELIVERED,
        undelivered: OrderState.UNDELIVERED,
      },
    },
    [OrderState.DELIVERED]: {
      type: "final",
    },
  },
});

const producer = new KafkaProducer();

const OrderMachineService = interpret(orderMachine)
  .onTransition(async (state, payload) => {
    switch (state.value) {
      case "created": {
        producer.produceMessage("order-stream", payload);
        break;
      }
      case "order_accepted": {
        const deliveryPartnerPayload = {
          ...payload,
          orderStatus: "ASSIGN_DELIVERY_PARTNER",
        };
        await OrderController._updateOrderStatus(
          payload.orderId,
          "restaurant_accepted"
        );
        producer.produceMessage("order-stream", deliveryPartnerPayload);
        break;
      }
      case "delivery_partner_assigned": {
        const orderPickupPayload = {
          ...payload,
          orderStatus: "ORDER_PICKED_UP",
        };
        producer.produceMessage("order-stream", orderPickupPayload);
        break;
      }
      case "order_on_the_way": {
        const orderOnTheWayPayload = {
          ...payload,
          orderStatus: "DELIVERED",
        };
        producer.produceMessage("order-stream", orderOnTheWayPayload);
      }
    }
  })
  .start();

export { OrderMachineService };
