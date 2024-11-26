<template>
  <div class="p-4">
    <el-row :gutter="20">
      <el-col :span="6">
        <el-card class="h-32">
          <div class="flex items-center h-full">
            <el-icon class="text-4xl text-blue-500">
              <User />
            </el-icon>
            <div class="ml-4">
              <div class="text-gray-500">总用户数</div>
              <div class="text-2xl font-bold mt-1">{{ stats.totalUsers }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="h-32">
          <div class="flex items-center h-full">
            <el-icon class="text-4xl text-green-500">
              <Reading />
            </el-icon>
            <div class="ml-4">
              <div class="text-gray-500">总图书数</div>
              <div class="text-2xl font-bold mt-1">{{ stats.totalBooks }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="h-32">
          <div class="flex items-center h-full">
            <el-icon class="text-4xl text-orange-500">
              <Tickets />
            </el-icon>
            <div class="ml-4">
              <div class="text-gray-500">借阅中</div>
              <div class="text-2xl font-bold mt-1">{{ stats.borrowing }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col :span="6">
        <el-card class="h-32">
          <div class="flex items-center h-full">
            <el-icon class="text-4xl text-purple-500">
              <DataLine />
            </el-icon>
            <div class="ml-4">
              <div class="text-gray-500">本月借阅</div>
              <div class="text-2xl font-bold mt-1">{{ stats.monthlyBorrows }}</div>
            </div>
          </div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="mt-4">
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="font-bold">借阅趋势</div>
          </template>
          <div ref="borrowTrendChart" style="height: 300px"></div>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="font-bold">热门图书</div>
          </template>
          <div ref="popularBooksChart" style="height: 300px"></div>
        </el-card>
      </el-col>
    </el-row>

    <el-row :gutter="20" class="mt-4">
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="font-bold">最近借阅</div>
          </template>
          <el-table :data="recentBorrows" style="width: 100%">
            <el-table-column prop="bookName" label="书名" />
            <el-table-column prop="username" label="借阅人" width="120" />
            <el-table-column prop="lendDate" label="借阅日期" width="120" />
          </el-table>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <template #header>
            <div class="font-bold">即将到期</div>
          </template>
          <el-table :data="dueSoonBooks" style="width: 100%">
            <el-table-column prop="bookName" label="书名" />
            <el-table-column prop="username" label="借阅人" width="120" />
            <el-table-column prop="returnDate" label="应还日期" width="120" />
            <el-table-column prop="daysLeft" label="剩余天数" width="100">
              <template #default="scope">
                <el-tag :type="scope.row.daysLeft < 3 ? 'danger' : 'warning'">
                  {{ scope.row.daysLeft }}天
                </el-tag>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import * as echarts from 'echarts'
import { User, Reading, Tickets, DataLine } from '@element-plus/icons-vue'

const stats = ref({
  totalUsers: 1000,
  totalBooks: 5000,
  borrowing: 300,
  monthlyBorrows: 150,
})

const recentBorrows = ref([
  {
    bookName: '深入理解计算机系统',
    username: '张三',
    lendDate: '2024-01-20',
  },
  {
    bookName: 'JavaScript高级程序设计',
    username: '李四',
    lendDate: '2024-01-19',
  },
  // 更多数据...
])

const dueSoonBooks = ref([
  {
    bookName: '深入理解计算机系统',
    username: '张三',
    returnDate: '2024-01-25',
    daysLeft: 2,
  },
  {
    bookName: 'JavaScript高级程序设计',
    username: '李四',
    returnDate: '2024-01-28',
    daysLeft: 5,
  },
  // 更多数据...
])

const borrowTrendChart = ref()
const popularBooksChart = ref()

onMounted(() => {
  // 借阅趋势图表
  const borrowTrend = echarts.init(borrowTrendChart.value)
  borrowTrend.setOption({
    tooltip: {
      trigger: 'axis',
    },
    xAxis: {
      type: 'category',
      data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月'],
    },
    yAxis: {
      type: 'value',
    },
    series: [
      {
        name: '借阅量',
        type: 'line',
        smooth: true,
        data: [120, 132, 101, 134, 90, 230, 210],
      },
    ],
  })

  // 热门图书图表
  const popularBooks = echarts.init(popularBooksChart.value)
  popularBooks.setOption({
    tooltip: {
      trigger: 'item',
    },
    series: [
      {
        name: '借阅次数',
        type: 'pie',
        radius: '50%',
        data: [
          { value: 35, name: '深入理解计算机系统' },
          { value: 30, name: 'JavaScript高级程序设计' },
          { value: 25, name: '算法导论' },
          { value: 20, name: '设计模式' },
          { value: 15, name: '计算机网络' },
        ],
      },
    ],
  })

  // 监听窗口大小变化，调整图表大小
  window.addEventListener('resize', () => {
    borrowTrend.resize()
    popularBooks.resize()
  })
})

// TODO: 实现数据加载功能
const loadData = () => {
  // 加载统计数据
  // 加载最近借阅
  // 加载即将到期
}

// 初始加载
loadData()
</script>
