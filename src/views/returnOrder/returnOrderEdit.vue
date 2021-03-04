<template>
  <div class="classification-edit">
    <return-oder-form ref="goodsForm" :params="params" @confirm="addClassification" />
  </div>
</template>

<script>
import ReturnOderForm from '@/views/returnOrder/components/returnOrderForm'
import Axios from 'axios'
export default {
  name: 'ReturnOrderEdit',
  components: { ReturnOderForm },
  data() {
    return {
      params: {
      }
    }
  },
  methods: {
    addClassification(params) {
      Axios.get('http://tp51/index.php/api/ReturnReceipt/addReturnReceipt', {
        params: { ...params }
      }).then(({ data }) => {
        if (data.code === 200) {
          this.$message.success('添加成功')
          this.$refs.goodsForm.resetFields()
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
