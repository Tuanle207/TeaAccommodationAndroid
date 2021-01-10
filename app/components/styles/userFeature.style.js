import {StyleSheet} from 'react-native';

const input = StyleSheet.create({
    label:{
        color: '#D9D9D9',
        fontSize: 13,
    },
    text:{
        width: "100%",
        borderBottomColor: "#fff",
        borderBottomWidth: 1,
        borderColor: "#204051",
        color: "#fff",
        paddingLeft: 0,
        fontSize: 18,
        marginBottom: 19,
        paddingBottom: 5,
        paddingTop: 5
    },
    textWithValidate:{
        width: "100%",
        borderBottomColor: "#fff",
        borderBottomWidth: 1,
        borderColor: "#204051",
        color: "#fff",
        paddingLeft: 0,
        fontSize: 18,
        marginBottom: 5,
        paddingBottom: 5,
        paddingTop: 5
    }
    ,
    ContainerPassword:{
        width: "100%",
        borderBottomColor: "#fff",
        borderBottomWidth: 1,
        borderColor: "#204051",
        marginBottom: 5,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
    textPassword:{
        paddingLeft: 0, 
        fontSize: 18, 
        color: "#fff", 
        width: "93%", 
        paddingBottom: 0
    }
})

const topic = StyleSheet.create({
    style:{
        fontSize: 20,
        fontWeight: "bold",
        alignSelf: "center",
        color: "#fff",
        marginTop: 15,
    }
})

const mainButton = StyleSheet.create({
    style:{
        alignSelf: "center",
        alignItems: "center",
        backgroundColor: "#06BBD8",
        borderRadius: 23,
        paddingHorizontal: 35,
        paddingVertical: 10,
        width: "58%",
    },
    text:{
        fontWeight: "bold", 
        fontSize: 16
    }
})

const imageButton = StyleSheet.create({
    style:{
        fontSize: 16, 
        color: "#06BBD8", 
        marginTop: 17, 
        marginBottom: 0 
    }
})

const navigationTittle = StyleSheet.create({
    style: {
        fontSize: 20,
        fontWeight: "bold",
        color: "#fff",
        justifyContent: 'center',
    }
})

export {input, topic, mainButton, imageButton, navigationTittle};