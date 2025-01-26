import { ref } from 'vue';

export const useUserActions = () => {
    const clickCount = ref(0);

    const handleAddUser = () => {
        clickCount.value++;
        console.log(`Button clicked ${clickCount.value} times`);
        // Add more user-related logic here
    };

    return {
        handleAddUser,
        clickCount
    };
};
