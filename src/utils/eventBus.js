/**
 * @description 创建全局Vue事件总线 EventBus
 * 
*/
const EventBus = (Vue) => {
    const Bus = new Vue({
        methods: {
            on(event, ...args){
                this.$on(event, ...args);
            },
            emit(event, callback){
                this.$emit(event, callback);
            },
            off(event, callback){
                this.$off(event, callback);
            }
        }
    });
    Vue.prototype.$bus = Bus;
}
export default EventBus;