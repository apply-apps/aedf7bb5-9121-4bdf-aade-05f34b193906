// Filename: index.js
// Combined code from all files

import React from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Text, ActivityIndicator, View } from 'react-native';
import axios from 'axios';
import { useEffect, useState } from 'react';

const API_URL = 'http://apihub.p.appply.xyz:3300/chatgpt';

const WorkoutList = () => {
    const [workouts, setWorkouts] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const fetchWorkouts = async () => {
            setLoading(true);
            try {
                const response = await axios.post(API_URL, {
                    messages: [
                        {
                            role: "system",
                            content: "You are a helpful assistant. Please provide different types of workouts with names, duration, and difficulty level."
                        },
                        {
                            role: "user",
                            content: "Can you list some workout routines?"
                        }
                    ],
                    model: "gpt-4o"
                });

                const { data } = response;
                const resultString = data.response;
                // Assuming the response is a JSON formatted string of workouts
                setWorkouts(JSON.parse(resultString));
            } catch (error) {
                console.error("Error fetching workouts: ", error);
            } finally {
                setLoading(false);
            }
        };

        fetchWorkouts();
    }, []);

    if (loading) {
        return <ActivityIndicator size="large" color="#0000ff" style={{ marginTop: 20 }} />;
    }

    return (
        <View style={stylesWorkoutList.container}>
            {workouts.map((workout, index) => (
                <View key={index} style={stylesWorkoutList.workout}>
                    <Text style={stylesWorkoutList.name}>{workout.name}</Text>
                    <Text>Duration: {workout.duration}</Text>
                    <Text>Difficulty: {workout.difficulty}</Text>
                </View>
            ))}
        </View>
    );
};

const stylesWorkoutList = StyleSheet.create({
    container: {
        padding: 20,
    },
    workout: {
        backgroundColor: '#e0e0e0',
        padding: 15,
        borderRadius: 10,
        marginBottom: 10,
    },
    name: {
        fontWeight: 'bold',
        fontSize: 18,
    },
});

const App = () => {
    return (
        <SafeAreaView style={stylesApp.container}>
            <ScrollView>
                <Text style={stylesApp.title}>Workout Tracker</Text>
                <WorkoutList />
            </ScrollView>
        </SafeAreaView>
    );
}

const stylesApp = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 20,
        backgroundColor: '#fafafa',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        textAlign: 'center',
        marginVertical: 20,
    },
});

export default App;