import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Linking, Dimensions } from 'react-native';
import TypeWriter from 'react-native-typewriter';

// Constants
const IMAGE_SOURCE = require('./assets/gradient_waves.gif');
const LINKS = [
  { title: 'Github', url: 'https://github.com/sethmorton' },
  { title: 'LinkedIn', url: 'https://www.linkedin.com/in/seth-morton-118574242' },
  { title: 'Resume', url: 'https://drive.google.com/file/d/1PhMwbAJn1X4-PdA_ictxGq8tT8G37COo/view?usp=sharing' },
];
const { width } = Dimensions.get('window');

// Helper functions
const scaleText = (size) => {
  const baseWidth = 350;
  const scaleFactor = width / baseWidth;
  return Math.min(Math.max(size * scaleFactor, 30), 90);
};

// Components
const TypeWriterText = ({ content, delay, size }) => (
  <TypeWriter typing={1} initialDelay={delay} minDelay={50} maxDelay={100} style={[styles.text, { fontSize: scaleText(size) }]}>
    {content}
  </TypeWriter>
);

const IntroText = () => (
  <View style={styles.textContainer}>
    <TypeWriterText content="Hello!" size={30} delay={0} />
    <View style={styles.gap} />
    <TypeWriterText content="I'm Seth" size={30} delay={300} />
  </View>
);

const Links = () => (
  <View style={styles.otherTextContainer}>
    {LINKS.map((link, index) => (
      <React.Fragment key={index}>
        {index > 0 && <Text style={[styles.text, { fontSize: scaleText(15) }]}> | </Text>}
        <TouchableOpacity onPress={() => Linking.openURL(link.url)}>
          <TypeWriterText content={link.title} size={15} delay={600 + index * 200} />
        </TouchableOpacity>
      </React.Fragment>
    ))}
  </View>
);

// Main App component
export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground source={IMAGE_SOURCE} resizeMode="cover" style={styles.image}>
        <IntroText />
        <Links />
        <StatusBar style="auto" />
      </ImageBackground>
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    flex: 1,
    width: '100%',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: '10vh',
  },
  otherTextContainer: {
    position: 'absolute',
    right: 40,
    top: '50%',
    transform: [{ translateY: -50 }],
    flexDirection: 'row',
    alignItems: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
  gap: {
    height: 10,
  },
});