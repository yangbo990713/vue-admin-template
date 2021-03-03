<template>
  <div class="classification-edit">
    <merchant-form ref="merchantForm" :params="params" @confirm="addClassification" />
  </div>
</template>

<script>
import MerchantForm from '@/views/merchant/components/merchantForm'
import Axios from 'axios'
export default {
  name: 'MerchantEdit',
  components: { MerchantForm },
  data() {
    return {
      params: {
        number: '',
        name: '',
        contact_person: '',
        telephone: '',
        address: ''
      }
    }
  },
  methods: {
    addClassification(params) {
      console.log('Galaxy', JSON.stringify(params))
      Axios.get('http://tp51/index.php/api/BusinessInformation/addBusiness', { params: { ...params }}).then(({ data }) => {
        this.tableData = data.data
      })
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
  max-width: 700px;
  ::v-deep .el-form--inline .el-form-item {
    //margin-bottom: 0;
  }
  .el-form--inline{
    margin-top: 18px;
  }
}
</style>
