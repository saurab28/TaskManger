<script setup>
import { ref, watch } from 'vue'

const taskName = ref('')
const priority = ref("")
const emit = defineEmits(['createTask'])
const errorNameMsg = ref(false)

watch(taskName , (newtaskName,previoustaskname) => {
    if (newtaskName.length > 20){
        errorNameMsg.value = ! errorNameMsg
        
    }

})


const addTask = (event) => {
    if (taskName.value != ''){
    event.preventDefault();
    const newTask = {
        task: taskName.value.trim(),
        id: Date.now(),
        priority : priority.value ,
        isCompleted : false,
    }

    //   tasksList.value.push(newTask)
    emit(
        "createTask",newTask
    )
    taskName.value = '';
    priority.value = " ";
    

    }
}



</script>
<template>
     <div class="modal fade" id="staticBackdrop" data-bs-backdrop="static" data-bs-keyboard="false" tabindex="-1" aria-labelledby="staticBackdropLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content">
            <form @submit="addTask" class="flex flex-col fit-content  items-center p-3 ">
                <div>
                    <input v-model="taskName" class="border-white border-2 rounded-sm p-1 my-2 text-lg text-black size-max px-2 bg-cyan-300" placeholder="task name" />
                    <p v-if="errorNameMsg">*Too many characters</p>
                    <label class="ml-3 mr-1 ">Priority</label>
                    <select v-model="priority" class=" text-black bg-cyan-300" >
                        <option value="high" class=" bg-red-400" >High</option>
                        <option value="Medium" class=" bg-yellow-400"> Medium</option>
                        <option value="low" class=" bg-green-400">Low</option>
                        
                    </select>
                    <button type="button" class="btn-close relative bottom-7 left-10" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <button class=" text-gray-700 p-2 rounded px-4 size-max bg-cyan-300" >Add Task</button>
                </form>
            </div>
        </div>
    </div>
</template>