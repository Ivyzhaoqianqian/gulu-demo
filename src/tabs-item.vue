<template>
    <div class="tabs-item" @click="xxx" :class="classes">
        <slot></slot>
    </div>
</template>

<script>
export default{
    name:'GuluTabsItem',
    inject:['eventBus'],
    data(){
        return{
            active:false
        }
    },
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
    methods:{
        xxx(){
            this.eventBus.$emit('update:selected', this.name, this)
        }
    }
}
</script>

<style lang="scss" scoped>
$blue:lightblue;
    .tabs-item {
        flex-shrink:0;
        padding: 0 1em;
        cursor: pointer;
        height: 100%;
        display: flex;
        align-items: center;
        
        &.active{
            font-weight: bold;
            color: $blue;
        }
    }
</style>