<template>
  <div class="p-4">
    <el-card class="mb-4">
      <el-form :inline="true" :model="queryParams" class="flex flex-wrap gap-4">
        <el-form-item label="角色名称">
          <el-input v-model="queryParams.roleName" placeholder="请输入角色名称" />
        </el-form-item>
        <el-form-item label="角色编码">
          <el-input v-model="queryParams.roleCode" placeholder="请输入角色编码" />
        </el-form-item>
        <el-form-item label="状态">
          <el-select v-model="queryParams.status" placeholder="请选择状态">
            <el-option label="启用" value="1" />
            <el-option label="禁用" value="0" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="handleQuery">查询</el-button>
          <el-button @click="resetQuery">重置</el-button>
        </el-form-item>
      </el-form>
    </el-card>

    <el-card>
      <template #header>
        <div class="flex justify-between items-center">
          <span>角色列表</span>
          <el-button type="primary" @click="handleAdd">新增角色</el-button>
        </div>
      </template>

      <el-table :data="roleList" border style="width: 100%">
        <el-table-column prop="roleName" label="角色名称" />
        <el-table-column prop="roleCode" label="角色编码" />
        <el-table-column prop="description" label="角色描述" />
        <el-table-column prop="status" label="状态">
          <template #default="{ row }">
            <el-tag :type="row.status === '1' ? 'success' : 'danger'">
              {{ row.status === '1' ? '启用' : '禁用' }}
            </el-tag>
          </template>
        </el-table-column>
        <el-table-column prop="createTime" label="创建时间" />
        <el-table-column label="操作" width="200">
          <template #default="{ row }">
            <el-button type="primary" link @click="handleEdit(row)">编辑</el-button>
            <el-button type="primary" link @click="handleAssignPermission(row)">分配权限</el-button>
            <el-button type="danger" link @click="handleDelete(row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="flex justify-end mt-4">
        <el-pagination
          v-model:current-page="queryParams.pageNum"
          v-model:page-size="queryParams.pageSize"
          :total="total"
          :page-sizes="[10, 20, 30, 50]"
          layout="total, sizes, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref, reactive } from 'vue';

interface QueryParams {
  roleName: string;
  roleCode: string;
  status: string;
  pageNum: number;
  pageSize: number;
}

const queryParams = reactive<QueryParams>({
  roleName: '',
  roleCode: '',
  status: '',
  pageNum: 1,
  pageSize: 10,
});

const total = ref(0);
const roleList = ref([]);

const handleQuery = () => {
  // TODO: 实现查询逻辑
};

const resetQuery = () => {
  queryParams.roleName = '';
  queryParams.roleCode = '';
  queryParams.status = '';
  handleQuery();
};

const handleAdd = () => {
  // TODO: 实现新增角色逻辑
};

const handleEdit = (row: any) => {
  // TODO: 实现编辑角色逻辑
};

const handleAssignPermission = (row: any) => {
  // TODO: 实现分配权限逻辑
};

const handleDelete = (row: any) => {
  // TODO: 实现删除角色逻辑
};

const handleSizeChange = (val: number) => {
  queryParams.pageSize = val;
  handleQuery();
};

const handleCurrentChange = (val: number) => {
  queryParams.pageNum = val;
  handleQuery();
};
</script>
