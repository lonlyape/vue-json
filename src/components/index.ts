import JsonCom from "./json/index.vue";

export const Json = JsonCom

export default {
  install(app: any){
    app.component('json-lonlyape', JsonCom)
  }
}