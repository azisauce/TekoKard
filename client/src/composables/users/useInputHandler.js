import { ref } from 'vue';

export const useInputHandler = () => {
    const inputValue = ref('');

    const handleInput = () => {
        console.log(inputValue.value);
        // Add more input handling logic here
    };

    return {
        inputValue,
        handleInput
    };
};
