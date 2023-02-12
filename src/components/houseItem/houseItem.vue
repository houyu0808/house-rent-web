<template>
    <div>
        <img :src="house.coverUrl" class="house-img" alt="">
        <img src="../../static/icon/hot.png" class="hot-icon" alt="hot" v-if="hot">
        <div class="house-info">
            <div class="font-s14 name">{{'[' + house.city + '市-' + house.district +'区] ' + house.name}}</div>
            <div class="font-s14 mt-4">{{house.communityName}}·{{house.room}}室{{house.hall}}厅{{house.toilet}}卫</div>
            <div class="font-cf00 mt-4 flex justify-between">
                <div class="font-bold">{{house.rentFee}}/月</div>
                <div>押{{house.cashMonths}}付{{house.feeMonths}}</div>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
const props = defineProps({
    house: {
        type:Object,
        required: true,
        default: {}
    },
    hot: {
        type:Boolean,
        required: false,
        default: false
    }
})
</script>

<style scoped lang="scss">
.house-img{
    width: 100%;
    height: 205px;
    object-fit: cover;
    border-top-left-radius: 4px;
    border-top-right-radius: 4px;
}
.house-info{
    padding: 8px 12px;
    .name{
        overflow: hidden;
        white-space: nowrap;
        text-overflow: ellipsis;
    }
}
.hot-icon{
    position: absolute;
    margin-left: -48px;
}
</style>