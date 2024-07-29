import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Linking, Dimensions } from 'react-native';
import TypeWriter from 'react-native-typewriter';

// Constants
const IMAGE_SOURCE = require('./assets/circle_chips.gif');
const LINKS = [
  { title: 'Github', url: 'https://github.com/sethmorton' },
  { title: 'LinkedIn', url: 'https://www.linkedin.com/in/seth-morton-118574242' },
  { title: 'Resume', url: 'https://drive.google.com/file/d/1PhMwbAJn1X4-PdA_ictxGq8tT8G37COo/view?usp=sharing' },
];
const { width, height } = Dimensions.get('window');

// Helper functions
const scaleText = (size) => {
  const baseWidth = 350;
  const scaleFactor = Math.min(width, height) / baseWidth;
  return Math.min(Math.max(size * scaleFactor, 12), 40); // Adjusted min and max sizes
};

// Components
const TypeWriterText = ({ content, delay, size }) => (
  <TypeWriter typing={1} initialDelay={delay} minDelay={50} maxDelay={100} style={[styles.text, { fontSize: scaleText(size) }]}>
    {content}
  </TypeWriter>
);

const IntroText = () => (
  <View style={styles.textContainer}>
    <TypeWriterText content="Hello!" size={20} delay={0} /> {/* Reduced size */}
    <View style={styles.gap} />
    <TypeWriterText content="I'm Seth" size={20} delay={300} /> {/* Reduced size */}
  </View>
);

const Links = () => (
  <View style={styles.linksContainer}>
    {LINKS.map((link, index) => (
      <React.Fragment key={index}>
        {index > 0 && <Text style={[styles.text, { fontSize: scaleText(10) }]}> | </Text>}
        <TouchableOpacity onPress={() => Linking.openURL(link.url)}>
          <TypeWriterText content={link.title} size={10} delay={600 + index * 200} /> {/* Reduced size */}
        </TouchableOpacity>
      </React.Fragment>
    ))}
  </View>
);

// Main App component
export default function App() {
  return (
    <View style={styles.container}>
      <View style={styles.gifContainer}>
        <ImageBackground source={IMAGE_SOURCE} resizeMode="contain" style={styles.image}>
          <View style={styles.contentContainer}>
            <IntroText />
            <Links />
          </View>
        </ImageBackground>
      </View>
      <StatusBar style="light" />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    alignItems: 'center',
    justifyContent: 'center',
  },
  gifContainer: {
    width: Math.min(width, height) * 0.9, // Increased to 90% of the smaller dimension
    height: Math.min(width, height) * 0.9, // Increased to 90% of the smaller dimension
    justifyContent: 'center',
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    position: 'absolute',
    alignItems: 'center',
    justifyContent: 'center',
    width: '80%', // Limit the width of the content
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  linksContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 10, // Reduced margin
    flexWrap: 'wrap', // Allow wrapping if needed
    justifyContent: 'center',
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  gap: {
    height: 5, // Reduced gap
  },
});