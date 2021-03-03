<template>
  <div class="classification-edit">
    <order-form ref="goodsForm" :params="params" @confirm="addClassification" />
  </div>
</template>

<script>
import OrderForm from '@/views/order/components/orderForm'
import Axios from 'axios'
export default {
  name: 'OrderEdit',
  components: { OrderForm },
  data() {
    return {
      params: {
        number: '',
        commodity_id: '',
        date: '',
        quantity: '',
        business_id: '',
        level: ''
      }
    }
  },
  methods: {
    addClassification(params) {
      Axios.get('http://tp51/index.php/api/OrderInformation/addOrder', {
        params: {
          ...params
        }
      }).then(({ data }) => {
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
