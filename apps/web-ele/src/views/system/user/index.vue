<template>
  <div class="p-4">
    <ElCard class="mb-4">
      <ElForm :inline="true" :model="queryParams" class="flex flex-wrap gap-4">
        <ElFormItem label="用户名">
          <ElInput v-model="queryParams.username" placeholder="请输入用户名" />
        </ElFormItem>
        <ElFormItem label="手机号">
          <ElInput v-model="queryParams.phone" placeholder="请输入手机号" />
        </ElFormItem>
        <ElFormItem label="状态">
          <ElSelect v-model="queryParams.status" placeholder="请选择状态">
            <ElOption label="启用" value="1" />
            <ElOption label="禁用" value="0" />
          </ElSelect>
        </ElFormItem>
        <ElFormItem>
          <ElButton type="primary" @click="handleQuery">查询</ElButton>
          <ElButton @click="resetQuery">重置</ElButton>
        </ElFormItem>
      </ElForm>
    </ElCard>

    <ElCard>
      <template #header>
        <div class="flex justify-between items-center">
          <span>用户列表</span>
          <ElButton type="primary" @click="handleAdd">新增用户</ElButton>
        </div>
      </template>

      <ElTable :data="userList" border style="width: 100%">
        <ElTableColumn prop="username" label="用户名" />
        <ElTableColumn prop="nickname" label="昵称" />
        <ElTableColumn prop="phone" label="手机号" />
        <ElTableColumn prop="email" label="邮箱" />
        <ElTableColumn prop="status" label="状态">
          <!-- <template #default="{ row }">
            <ElTag :type="row.status === '1' ? 'success' : 'danger'">
              {{ row.status === '1' ? '启用' : '禁用' }}
            </ElTag>
          </template> -->
        </ElTableColumn>
        <ElTableColumn prop="createTime" label="创建时间" />
        <ElTableColumn label="操作" width="200">
          <!-- <template #default="{ row }">
            <ElButton type="primary" link @click="handleEdit(row)">编辑</ElButton>
            <ElButton type="primary" link @click="handleAssignRole(row)">分配角色</ElButton>
            <ElButton type="danger" link @click="handleDelete(row)">删除</ElButton>
          </template> -->
        </ElTableColumn>
      </ElTable>

      <div class="flex justify-end mt-4">
        <ElPagination
          v-model:current-page="queryParams.pageNum"
          v-model:page-size="queryParams.pageSize"
          :total="total"
          :page-sizes="[10, 20, 30, 50]"
          layout="total, sizes, prev, pager, next"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </ElCard>


    <ElDialog
  v-model="dialogVisible"
  title="新建用户"
  width="500px"
>
  <ElForm
    ref="formRef"
    :model="formData"
    label-width="80px"
  >
    <ElFormItem label="用户名" prop="username">
      <ElInput v-model="formData.username" placeholder="请输入用户名" />
    </ElFormItem>
    <ElFormItem label="密码" prop="password">
      <ElInput
        v-model="formData.password"
        type="password"
        placeholder="请输入密码"
        show-password
      />
    </ElFormItem>
  </ElForm>
  <template #footer>
    <span class="dialog-footer">
      <ElButton @click="dialogVisible = false">取消</ElButton>
      <ElButton type="primary" @click="handleSubmit">确定</ElButton>
    </span>
  </template>
</ElDialog>

    
  </div>
</template>

<script setup lang="ts">
import { ElDialog, ElCard, ElForm, ElFormItem, ElInput, ElSelect, ElOption, ElButton, ElTable, ElTableColumn, ElPagination } from 'element-plus';
import { ref, reactive } from 'vue';
import { createUserApi } from '#/api/core/user';

interface QueryParams {
  username: string;
  phone: string;
  status: string;
  pageNum: number;
  pageSize: number;
}

const queryParams = reactive<QueryParams>({
  username: '',
  phone: '',
  status: '',
  pageNum: 1,
  pageSize: 10,
});

const total = ref(0);
const userList = ref([]);

const handleQuery = () => {
  // TODO: 实现查询逻辑
};

const resetQuery = () => {
  queryParams.username = '';
  queryParams.phone = '';
  queryParams.status = '';
  handleQuery();
};

const handleAdd = () => {
  dialogVisible.value = true;
  formData.username = '';
  formData.password = '';
};

const handleEdit = (row: any) => {
  // TODO: 实现编辑用户逻辑
};

const handleAssignRole = (row: any) => {
  // TODO: 实现分配角色逻辑
};

const handleDelete = (row: any) => {
  // TODO: 实现删除用户逻辑
};

const handleSizeChange = (val: number) => {
  queryParams.pageSize = val;
  handleQuery();
};

const handleCurrentChange = (val: number) => {
  queryParams.pageNum = val;
  handleQuery();
};

const dialogVisible = ref(false);
const formData = reactive({
  username: '',
  password: ''
});
const formRef = ref();


const handleSubmit = async () => {
  // TODO: Add your API call here to create the user
  // const res = await createUser(formData);
  dialogVisible.value = false;

  const res = await createUserApi(formData);

  console.log(res);
  
  // Refresh the user list after successful creation
  handleQuery();
};
</script>
