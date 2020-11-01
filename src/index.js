import React, { useState, useEffect } from 'react';
import { SafeAreaView ,FlatList , Text, StyleSheet, StatusBar, TouchableOpacity } from 'react-native';

import api from './services/api';

//Componentes não possuem valor semântico
//Não possuem estilização própria
//Todos os Componentes possuem por padrão "display: flex"
//Não existe herança de estilização

//View: div, footer, aside, main
//Text: h1, h2, h3, h4, p, span, strong

export default function App() {
    const [projects, setProjects] = useState([]);
    
    useEffect(() => {
        api.get('projects').then(response => {
            console.log(response.data);
            setProjects(response.data);
        })
    }, [])

    async function handleAddProject(){
        const response = await api.post('projects', {
            title: `Novo Projeto ${Date.now()}`,
            owner: 'Murilo Neves'
        })

        const project = response.data;

        setProjects([...projects, project])
    }

    return (
        <>
        <StatusBar barStyle="light-content" backgroundColor="#7159c1"/>

        <SafeAreaView style={styles.container}> 
        {/* //ocupa só a area segura da tela */}
            <FlatList //componente para lidar com listas, performa melhor com listas muito grandes
                data={projects} //variavel que armazena os dados(precisa ser um array)
                keyExtractor={project => project.id} //chama uma função que retorna qual o valor único dentro de cada item
                renderItem={({ item: project }) => (
                    <Text 
                        style={styles.project}
                    >{project.title}</Text>
                )}
            />
            <TouchableOpacity 
                activeOpacity={0.7} 
                style={styles.button} 
                onPress={handleAddProject}
            >
                <Text style={styles.buttonText}>Adicionar Projeto</Text>
            </TouchableOpacity>
        </SafeAreaView>

        {/* <View style={styles.container} >
            {projects.map(project => (
                <Text 
                    key={project.id} 
                    style={styles.project}
                >{project.title}</Text>
            ))}
        </View> */}
        </>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#7159c1',
    },
    project: {
        color: '#FFF',
        fontSize: 30,
    },
    button: {
        backgroundColor: '#FFF',
        margin: 20,
        height: 50,
        borderRadius: 5,
        justifyContent: 'center',
        alignItems: 'center'
    },
    buttonText: {
        fontWeight: 'bold',
        fontSize: 16,
    }
})