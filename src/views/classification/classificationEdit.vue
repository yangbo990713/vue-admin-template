<template>
  <div class="classification-edit">
    <el-form ref="form" inline size="small">
      <el-form-item label="类别名称：">
        <el-input v-model="classificationName" clearable placeholder="请输入类别名称" />
      </el-form-item>
      <el-form-item>
        <el-button @click="addClassification">确定</el-button>
      </el-form-item>
      <el-form-item>
        <el-button @click="resetFields">清空</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
export default {
  name: 'ClassificationEdit',
  data() {
    return {
      classificationName: ''
    }
  },
  methods: {
    addClassification() {
      let tableData = localStorage.getItem('classificationList')
      if (tableData) {
        tableData = JSON.parse(tableData)
      } else {
        tableData = []
      }
      const id = tableData.length ? tableData[tableData.length - 1].id + 1 : 1
      tableData.push({ id, name: this.classificationName })
      localStorage.setItem('classificationList', JSON.stringify(tableData))
      this.classificationName = ''
      this.$message.success('添加成功')
    },
    resetFields() {
      this.$refs.form.resetFields()
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
    margin-bottom: 0;
  }
}
</style>
