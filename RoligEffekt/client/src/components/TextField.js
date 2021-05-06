import React, {useEffect} from 'react'
import { StyleSheet, SafeAreaView } from 'react-native';


import { Input } from 'react-native-elements';




const TextField = (props) => {
    const [input, setInput] = React.useState();  
 

    useEffect(() => {
    console.log(input)
    }), [input];

   return(
   <SafeAreaView style={styles.inputContainer}>
        <Input
        style={styles.input}
        onChangeText={setInput}
        {...props}
        />
   </SafeAreaView>
   );

}
const styles = StyleSheet.create({
    inputContainer: {
       
    },
    input: {
        height: 40,
        margin: 12,

        padding: '10px'

    },
});

export default TextField;