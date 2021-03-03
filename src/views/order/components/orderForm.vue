<template>
  <el-form ref="form" :inline="inline" :model="params" :rules="rules" label-width="auto" size="small">
    <el-form-item label="订单编号：" prop="number">
      <el-input v-model="params.number" clearable placeholder="请输入订单编号" />
    </el-form-item>
    <el-form-item label="物品名称：" prop="commodity_id">
      <el-select v-model="params.commodity_id" placeholder="请选择物品" @change="selectGoods">
        <el-option v-for="item of goodsList" :key="item.id " :label="item.name" :value="item.id" />
      </el-select>
    </el-form-item>
    <el-form-item label="日期：" prop="date">
      <el-date-picker v-model="params.date" placeholder="请输入日期" value-format="yyyy-MM-dd" />
    </el-form-item>
    <el-form-item label="数量：" prop="quantity">
      <el-input v-model="params.quantity" clearable placeholder="请输入数量" />
    </el-form-item>
    <el-form-item label="商家名称：" prop="business_id">
      <el-select v-model="params.business_id" placeholder="请选择商家" @change="selectMerchant">
        <el-option v-for="item of merchantList" :key="item.id " :label="item.name" :value="item.id" />
      </el-select>
    </el-form-item>
    <el-form-item label="订单级别：" prop="level">
      <el-select v-model="params.level" placeholder="请选择级别" @change="selectLevel">
        <el-option v-for="item of levelList" :key="item.id " :label="item.name" :value="item.id" />
      </el-select>
    </el-form-item>
    <el-form-item>
      <el-button @click="addOrder">确定</el-button>
    </el-form-item>
    <!--<el-form-item v-if="inline">
      <el-button @click="resetFields">清空</el-button>
    </el-form-item>-->
  </el-form>
</template>

<script>
import Axios from 'axios'

export default {
  name: 'OrderForm',
  props: {
    params: {
      type: Object,
      required: true
    },
    inline: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      goodsList: [],
      merchantList: [],
      levelList: [
        {
          name: '普通',
          id: 1
        },
        {
          name: '加急',
          id: 2
        }
      ],
      rules: {
        number: [
          {
            required: true,
            message: '请输入订单编号'
          },
          {
            pattern: /^[a-z0-9]+$/i,
            message: '订单编号只能由英文和数字组成'
          },
          {
            max: 10,
            message: '订单编号最多10位'
          }
        ],
        date:
          {
            required: true,
            message: '请选择日期'
          },
        business_id:
          {
            required: true,
            message: '请选择商家'
          },
        commodity_id:
          {
            required: true,
            message: '请选择物品名称'
          },
        level:
          {
            required: true,
            message: '请选择订单级别'
          },
        quantity: [
          {
            required: true,
            message: '请输入数量'
          },
          {
            type: 'number',
            message: '请输入合法数字'
          }
        ]
      },
      price: 0
    }
  },
  created() {
    this.getGoodsList()
    this.getMerchantList()
  },
  methods: {
    getGoodsList() {
      Axios.get('http://tp51/index.php/api/CommodityInformation/commodityList', {
        params: {
          number: this.code,
          name: this.searchText
        }
      }).then(({ data }) => {
        this.goodsList = data.data
      })
    },
    getMerchantList() {
      Axios.get('http://tp51/index.php/api/BusinessInformation/businessList', {
        params: {
          name: this.searchText,
          number: this.code
        }
      }).then(({ data }) => {
        this.merchantList = data.data
      })
    },
    selectGoods(val) {
      const item = this.goodsList.find(item => item.id === val)
      this.price = item.price
    },
    selectMerchant(val) {
      const item = this.merchantList.find(item => item.id === val)
    },
    selectLevel(val) {
      const item = this.levelList.find(item => item.id === val)
    },
    addOrder() {
      this.$refs.form.validate(validate => {
        if (!validate) return
        this.$emit('confirm', this.params)
      })
    },
    resetFields() {
      this.$refs.form.resetFields()
    }
  }
}
</script>

<style lang="scss" scoped>
.el-form-item {
  &:last-child {
    margin-bottom: 0;
  }
}
</style>
