<script setup>
import { ref, onMounted, computed } from 'vue'
import AddTask from './AddTask.vue'
const tasksList = ref([])
const showAddTaskForm = ref(false)
const statusFilter = ref('all tasks')
const userSearch = ref('')


const filteredTasks = computed(() => {
  if (statusFilter.value === 'incomplete') {
    return tasksList.value.filter((task) => !task.isCompleted)
  }
  else if (statusFilter.value === 'completed') {
    return tasksList.value.filter((task) => task.isCompleted)
  }
  else {
    return tasksList.value
  }
})

const searchfilteredTasks = computed(() => { return filteredTasks.value.filter(eachtask => eachtask.task.includes(userSearch.value))})

onMounted(() => {
  const tasksStored = JSON.parse(localStorage.getItem('tasksList')) || []
  tasksList.value = tasksStored
})
const removeTask = (id) => {
  tasksList.value = tasksList.value.filter((Task) => Task.id !== id)
  localStorage.setItem('tasksList', JSON.stringify(tasksList.value))
}
const taskStatusToggle = (id) => {
  const task = tasksList.value.find((Task) => Task.id === id)
  task.isCompleted = !task.isCompleted
  localStorage.setItem('tasksList', JSON.stringify(tasksList.value))
}
const add = () => {
  showAddTaskForm.value = true
}

const createTask = (taskDetails) => {
  tasksList.value.push(taskDetails)
  localStorage.setItem('tasksList', JSON.stringify(tasksList.value))
}
</script>

<template>
  <div class="bg-gray-700 text-lg m-4 flex flex-col text-white p-4 rounded min-h-[90vh] items-center">
    <AddTask v-if="showAddTaskForm" @create-task="createTask" />
    <button @click="add" type="button" class="bg-white text-black size-max px-2 rounded h-[50px] mt-3 mb-3 " data-bs-toggle="modal" data-bs-target="#staticBackdrop"> Add more Tasks ...</button>
    
    <div class="bg-white min-h-96 w-[450px]  flex flex-col p-4 items-center text-black rounded">
      
      <select v-model="statusFilter" class="text-black bg-cyan-300 m-2 size-max w-[200px]">
        <option value="all tasks">All Tasks</option>
        <option value="completed">Completed</option>
        <option value="incomplete">Incomplete</option>
      </select>

      <input v-model="userSearch" placeholder="Search Tasks..." class="bg-orange-300 rounded p-1"/>
      <ul class="mt-4">
        <h1 class="text-2xl font-semibold">Tasks</h1>
        <p v-if="tasksList.length === 0" class="text-gray-400">Try adding task</p>
        <li
          v-for="Task in searchfilteredTasks"
          :key="Task.id"
          class="flex w-[200px] justify-between items-center h-[30px] m-1"
        >
          <input type="checkbox" @click="taskStatusToggle(Task.id)" />
          <p
            class="ml-3 flex items-center grow"
            :class="Task.isCompleted ? 'line-through text-gray-400' : 'no-underline'"
          >
            {{ Task.task }} - {{ Task.priority }}
          </p>
          <button @click="removeTask(Task.id)" class="w-[20px] h-[20px]">
            Delete
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>

<style scoped></style>
