<template>
  <div class="classification-edit">
    <merchant-form ref="merchantForm" :params="params" @confirm="addClassification" />
  </div>
</template>

<script>
import MerchantForm from '@/views/merchant/components/merchantForm'
export default {
  name: 'MerchantEdit',
  components: { MerchantForm },
  data() {
    return {
      params: {
        name: '',
        code: '',
        person: '',
        tel: '',
        address: ''
      }
    }
  },
  methods: {
    addClassification(params) {
      let tableData = localStorage.getItem('merchantList')
      if (tableData) {
        tableData = JSON.parse(tableData)
      } else {
        tableData = []
      }
      if (tableData.find(item => item.code === params.code)) {
        this.$message.error('商家编号重复')
        return
      }

      const id = tableData.length ? tableData[tableData.length - 1].id + 1 : 1
      tableData.push(Object.assign(params, { id }))
      localStorage.setItem('merchantList', JSON.stringify(tableData))
      this.$message.success('添加成功')
      this.$refs.merchantForm.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.classification-edit {
  background-color: #fff;
  margin: 15px;
  padding: 10px;

  ::v-deep .el-form--inline .el-form-item {
    //margin-bottom: 0;
  }
  .el-form--inline{
    margin-top: 18px;
  }
}
</style>
