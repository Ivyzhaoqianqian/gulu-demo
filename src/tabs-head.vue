<template>
    <div class="tabs-head">
        <slot></slot>
        <div class="line" ref="line"></div>
        <div class="actions-wrapper">
            <slot name="actions" ></slot>
        </div>
        
    </div>
</template>

<script>
export default{
    name:'GuluTabsHead',
    inject:['eventBus'],
    created(){
        this.eventBus.$on()
    }
}
</script>

<style lang="scss" scoped>
$tab-height:40px;
$blue:lightblue;
    .tabs-head{
        display: flex;
        height: $tab-height;
        justify-content: flex-start;
        align-content: center;
        position: relative;
    > .line{
        position: absolute;
        bottom: 0;
        border-bottom:1px solid $blue;
        width: 100px;
        
    }
    > .actions-wrapper{
        margin-left: auto;
        }
    }
</style>