import axios from "axios/index";

const Checkout = {
    initCart: cart => axios.get(`/carts/${cart}/items`),
    getCart: form => axios.post('/carts', form),
    addItem: (cart, form) => axios.post(`/carts/${cart}/items`, form),
    deleteItem: (cart, id) => axios.delete(`/carts/${cart}/items/${id}`),
    saveItem: (cart, id, qty) => axios.post(`/carts/${cart}/items`, {id, qty}),
    getPromoCode: codes => axios.get(`/vouchers?codes=${codes}`),
    getShippingRate: products => axios.post('/shipments/rates', products).then(res => res.data.data.rows).catch(err => []),
    placeOrder: order => axios.post('/payments', order),
    placeOrderWithoutLogin: order => axios.post('/orders', order)
};

export default Checkout