<template>
  <div class="classification-edit">
    <order-form ref="goodsForm" :params="params" @confirm="addClassification" />
  </div>
</template>

<script>
import OrderForm from '@/views/order/components/orderForm'
export default {
  name: 'OrderEdit',
  components: { OrderForm },
  data() {
    return {
      params: {
        name: '',
        code: '',
        goodsId: '',
        goodsName: '',
        merchantId: '',
        merchantName: '',
        date: '',
        levelId: ''
      }
    }
  },
  methods: {
    addClassification(params) {
      let tableData = localStorage.getItem('orderList')
      if (tableData) {
        tableData = JSON.parse(tableData)
      } else {
        tableData = []
      }
      if (tableData.find(item => item.code === params.code)) {
        this.$message.error('订单编号重复')
        return
      }

      const id = tableData.length ? tableData[tableData.length - 1].id + 1 : 1
      tableData.push(Object.assign(params, { id }))
      localStorage.setItem('orderList', JSON.stringify(tableData))
      this.$message.success('添加成功')
      this.$refs.goodsForm.resetFields()
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
