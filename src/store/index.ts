import {createStore} from 'vuex'
import {House} from "../common/interface";
interface State{
    house:House
}
export const store = createStore<State>({
    state(){
        return{
            house: {
                hall: "",
                room: "",
                toilet: "",
                address: "",
                area: "",
                bedroomDevice: "",
                cashMonths: "",
                city: "",
                communalDevice: "",
                communityName: "",
                coverUrl: "",
                district: "",
                elevator: "",
                feeMonths: "",
                floor: "",
                id: "",
                introduce: "",
                latitude: "",
                longitude: "",
                name: "",
                province: "",
                rentFee: "",
                status: "",
                towards: "",
                type: "",
                userId: "",
                clickTimes: ""
            }
        }
    },
    getters:{
        getHouse: (state) => state.house,
    },
    mutations:{
        setHouse(state, data){
            state.house = data
        }
    }
})