import axios from "axios/index";

const Products = {
    initProducts: (search='') => axios.get(`/merchandises${search}`).then(res => res.data.data.products).catch(err => console.log(err)),
    initBusiness: ()=> axios.get('/shops').then(res=>res.data.data.businesses).catch(err=> console.log(err))

}
export default Products