<template>
  <div class="classification-list">
    <div class="search-nav">
      <el-form inline size="small">
        <el-form-item label="物品编号：">
          <el-input v-model="code" clearable placeholder="请输入物品编号" />
        </el-form-item>
        <el-form-item label="物品名称：">
          <el-input v-model="searchText" clearable placeholder="请输入物品名称" />
        </el-form-item>
        <el-form-item>
          <el-button @click="getData">查询</el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      :data="tableData"
      border
    >
      <el-table-column
        label="物品编号"
        prop="number"
      />
      <el-table-column
        label="物品名称"
        prop="name"
      />
      <el-table-column
        label="类别"
        prop="type_name"
      />
      <el-table-column
        label="价格"
        prop="price"
      />
      <el-table-column
        label="库存"
        prop="stock"
      />
      <el-table-column
        label="编辑"
        width="100"
      >
        <template slot-scope="{row}">
          <el-button icon="el-icon-edit" size="small" @click="editGoods(row)" />
        </template>
      </el-table-column>
      <el-table-column
        label="删除"
        width="100"
      >
        <template slot-scope="{row}">
          <el-button icon="el-icon-delete" size="small" type="danger" @click="delGoods(row)" />
        </template>
      </el-table-column>
    </el-table>
    <el-dialog :visible.sync="visible" title="编辑物品">
      <goods-form :params="currentItem" @confirm="confirmEdit" />
    </el-dialog>
  </div>
</template>

<script>
import GoodsForm from '@/views/goods/components/goodsForm'
import Axios from 'axios'

export default {
  name: 'GoodsList',
  components: { GoodsForm },
  data() {
    return {
      tableData: [],
      searchText: '',
      code: '',
      visible: false,
      currentItem: {}
    }
  },
  created() {
    this.getData()
  },
  methods: {
    getData() {
      Axios.get('http://tp51/index.php/api/CommodityInformation/commodityList', {
        params: {
          number: this.code,
          name: this.searchText
        }
      }).then(({ data }) => {
        this.tableData = data.data
      })
    },
    editGoods(row) {
      this.currentItem = { ...row }
      this.visible = true
    },
    delGoods(row) {
      this.$confirm('是否确认删除该物品', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        Axios.get('http://tp51/index.php/api/CommodityInformation/delCommodity', {
          params: {
            id: row.id
          }
        }).then(({ data }) => {
          if (data && data.code === 200) {
            this.visible = false
            this.$message({
              type: 'success',
              message: '删除成功'
            })
            this.getData()
          } else {
            this.$message.error(data)
          }
        })
      }).catch(() => {

      })
    },
    confirmEdit(row) {
      Axios.get('http://tp51/index.php/api/CommodityInformation/editCommodity', {
        params: {
          ...row
        }
      }).then(({ data }) => {
        if (data && data.code === 200) {
          this.visible = false
          this.$message({
            type: 'success',
            message: '修改成功'
          })
          this.getData()
        } else {
          this.$message.error(data)
        }
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.classification-list {
  background-color: #fff;
  margin: 15px;

  .search-nav {
    padding: 10px;

    ::v-deep .el-form--inline .el-form-item {
      margin-bottom: 0;
    }
  }

  ::v-deep .el-table--border th.gutter:last-of-type {
    display: block !important;
    width: 17px !important;
  }
}
</style>
