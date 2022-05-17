<template>
     <div class="popover"  ref="popover">
    <div ref="contentWrapper" class="content-wrapper" v-if="visible" :class="{[`position-${position}`]:true}"> 
        <slot name="content" ></slot>
    </div>
    <span ref="triggerWrapper" style="display:inline-block">
        <slot ></slot>
    </span>
    </div>
</template>

<script>
    export default {
    name: "GuluPopover",
    data () {
        return {visible: false}
    },
    mounted(){
        if(this.trigger === 'click'){
            this.$refs.popover.addEventListener('click',this.onClick)
        }else{
            this.$refs.popover.addEventListener('mouseenter',this.open)
            this.$refs.popover.addEventListener('mouseleave',this.close)
        }
    },

    destroyed(){
         if(this.trigger === 'click'){
            this.$refs.popover.removeEventListener('click',this.onClick)
        }else{
            this.$refs.popover.removeEventListener('mouseenter',this.open)
            this.$refs.popover.removeEventListener('mouseleave',this.close)
        }
    },

    computed:{
        openEvent(){
            if(this.trigger === 'click'){
                return 'click'
            }else{
                return 'mouseenter'
            }
        },
        closeEvent(){
            if(this.trigger === 'click'){
                return 'click'
            }else{
                return 'mouseleave'
            }
        }
    },
    props:{
        position:{
            type:String,
            default:'top',
            validator(value){
                return ['top','bottom','left','right'].indexOf(value) >=0
            }
        },
        trigger:{
            type:String,
            default:'click',
            validator(value){
                return['click','hover'].indexOf(value) >=0
            }
        }
    },
    methods:{
        positionContent () {
            const {contentWrapper,triggerWrapper} = this.$refs
            document.body.appendChild(contentWrapper)
            const {width, height, top, left} = triggerWrapper.getBoundingClientRect()
            const {height:height2} = contentWrapper.getBoundingClientRect()

            let positions = {
                top:{
                    top:top + window.scrollY,
                    left:left + window.scrollX 
                },
                bottom:{
                    top:top +height+ window.scrollY ,
                    left:left + window.scrollX
                },
                left:{
                    top:top + window.scrollY +(height-height2) / 2,
                    left:left + window.scrollX,
                    
                },
                right:{
                    top:top + window.scrollY +(height-height2) / 2,
                    left:left+ window.scrollX +width,
                    
                },
            }
            contentWrapper.style.left= positions[this.position].left +'px'
            contentWrapper.style.top=positions[this.position].top + 'px'
        },

        onClickDocument (e) {
        if (this.$refs.popover &&
          (this.$refs.popover === e.target || this.$refs.popover.contains(e.target))
        ) { return }
        if(this.$refs.contentWrapper &&
            this.$refs.contentWrapper === e.target || this.$refs.contentWrapper.contains(e.target)
        ){return}
        this.close()
        },
        open () {
        this.visible = true
        this.$nextTick(() => {
          this.positionContent()
          document.addEventListener('click', this.onClickDocument)
        })
        },
        close () {
        this.visible = false
        document.removeEventListener('click', this.onClickDocument)
        },
            onClick(event){
                if(this.$refs.triggerWrapper.contains(event.target)){
                if(this.visible === true){
                    this.close()
                }else{
                    this.open()
                }
            }
        },
        
    }
}
</script>

<style lang="scss" scoped>
$border-color:#333;
$border-radius: 4px;
    .popover{
        display: inline-block;
        vertical-align: top;
        position: relative;
    }
    .content-wrapper{
            position: absolute;
            border:1px solid $border-color;
            border-radius: $border-radius;
            filter: drop-shadow(0  2px rgba( 0,0, 0,0.5)) ;
            background-color: white;
            padding:.5em 1em;
            max-width: 20em;
            word-break: break-all;
            &.position-top{
                transform: translateY(-100%);
                margin-top:-10px;
                &::before{
                content: '';
                display: block;
                border: 10px solid transparent;
                border-top-color: $border-color;
                width: 0;
                height: 0;
                position: absolute;
                top:  calc(100% + 1px);
                left: 10px;
            }
            &::after{
                content: '';
                display: block;
                border: 10px solid transparent;
                border-top-color: white;
                width: 0;
                height: 0;
                position: absolute;
                top: 100%;
                left: 10px;
            }
            }
               &.position-bottom{
                margin-top:10px;
                &::before{
                content: '';
                display: block;
                border: 10px solid transparent;
                border-bottom-color: $border-color;
                width: 0;
                height: 0;
                position: absolute;
                bottom:  calc(100% + 1px);
                left: 10px;
            }
            &::after{
                content: '';
                display: block;
                border: 10px solid transparent;
                border-bottom-color: white;
                width: 0;
                height: 0;
                position: absolute;
                bottom: 100%;
                left: 10px;
            }
            }

             &.position-left{
                transform: translateX(-100%);
                margin-left:-10px;
                &::before{
                content: '';
                display: block;
                border: 10px solid transparent;
                border-left-color: $border-color;
                width: 0;
                height: 0;
                position: absolute;
                left: 100%;
                top:50%;
                transform:translateY(-50%)
            }
            &::after{
                content: '';
                display: block;
                border: 10px solid transparent;
                border-left-color: white;
                width: 0;
                height: 0;
                position: absolute;
                left: calc(100% - 1px);
                top:50%;
                transform:translateY(-50%)
            }
            }

            &.position-right{
                margin-left:10px;
                &::before{
                content: '';
                display: block;
                border: 10px solid transparent;
                border-right-color: $border-color;
                width: 0;
                height: 0;
                position: absolute;
                right: 100%;
                top:50%;
                transform:translateY(-50%)
            }
            &::after{
                content: '';
                display: block;
                border: 10px solid transparent;
                border-right-color: white;
                width: 0;
                height: 0;
                position: absolute;
                right: calc(100% - 1px);
                top:50%;
                transform:translateY(-50%)
            }
            }
            
    }
</style>