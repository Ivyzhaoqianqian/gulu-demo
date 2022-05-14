<template>
    <div class="tabs-pane" :class="classes" v-if="active">
        <slot></slot>
    </div>
</template>

<script>
export default{
    name:'GuluTabsPane',
    inject:['eventBus'],
    name:'GuluTabsItem',

    props:{
        disable:{
            type:Boolean,
            default:false
        },
        name:{
            type:String,Number,
            require:true
        }
    },
    
    data(){
        return{
            active:false
        }
    },
    computed:{
        classes(){
            return{
                active:this.active
            }
        }
    },
    created(){
        this.eventBus.$on('update:selected',(name) =>{
            if(name ===this.name){
                this.active=true
            }else{
                this.active=false

            }
        })
    },
}
</script>

<style lang="scss" scoped>

.tabs-pane{
&.active{
            background-color: red;
        }
}

</style>