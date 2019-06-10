<template>
        <div class="mui-numbox">
			<button class="mui-btn mui-btn-numbox-minus" type="button" @click="subtract" :disabled="subDis">-</button>
			<input class="mui-input-numbox" type="number" :value="currentCount" />
			<button class="mui-btn mui-btn-numbox-plus" type="button" @click="plus" :disabled="plusDis">+</button>
		</div>
</template>
<script>
export default {
    props:[
        'initCount',//初始值
        'min',//下限
        'max',//上限
    ],
    data(){
        return {
            currentCount:1,
            subDis:true,
            plusDis:false,
        }
    },
    methods:{
        setDisable:function(){
            if(this.currentCount>=this.max){
                this.plusDis=true;
                this.subDis=false;
            }else{
                if(this.currentCount<=this.min){
                    this.plusDis=false;
                    this.subDis=true;
                }else{
                    this.subDis=false;
                    this.plusDis=false;
                }
            }
        },
        plus:function(){
            if(this.currentCount<this.max){
                this.currentCount++; 
            }
            // 设置 2 个按钮的disabled
            this.setDisable();
        },
        subtract:function(){
            if(this.currentCount>this.min){
                this.currentCount--;
            }
            // 设置 2 个按钮的disabled
            this.setDisable();
        }
    },
    created() {
        this.currentCount=this.initCount;
    },
}
</script>
<style lang="less">
    
</style>