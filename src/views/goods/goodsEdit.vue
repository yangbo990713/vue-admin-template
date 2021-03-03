<template>
  <div class="classification-edit">
    <goods-form ref="goodsForm" :params="params" @confirm="addClassification" />
  </div>
</template>

<script>
import GoodsForm from '@/views/goods/components/goodsForm'
import Axios from 'axios'
export default {
  name: 'GoodsEdit',
  components: { GoodsForm },
  data() {
    return {
      params: {
        name: '',
        number: '',
        type_id: '',
        type_name: '',
        price: '',
        stock: ''
      }
    }
  },
  methods: {
    addClassification(params) {
      Axios.get('http://tp51/index.php/api/CommodityInformation/addCommodity', { params: { ...params }})
        .then(({ data }) => {
          if (data && data.code === 200) {
            this.$message.success('添加成功')
            this.$refs.goodsForm.resetFields()
          } else {
            this.$message.error(data)
          }
        })
    }
  }
}
</script>

<style lang="scss" scoped>
.classification-edit {
  background-color: #fff;
  margin: 15px;
  padding: 10px;
  max-width: 700px;
  ::v-deep .el-form--inline .el-form-item {
    //margin-bottom: 0;
  }
  .el-form--inline{
    margin-top: 18px;
  }
}
</style>
