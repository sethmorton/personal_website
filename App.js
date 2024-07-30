import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Linking, Dimensions } from 'react-native';
import TypeWriter from 'react-native-typewriter';

// Constants
const IMAGE_SOURCE = require('./assets/chips.gif');
const LINKS = [
  { title: 'Github', url: 'https://github.com/sethmorton' },
  { title: 'LinkedIn', url: 'https://www.linkedin.com/in/seth-morton-118574242' },
  { title: 'Resume', url: 'https://drive.google.com/file/d/1PhMwbAJn1X4-PdA_ictxGq8tT8G37COo/view?usp=sharing' },
];
const { width, height } = Dimensions.get('window');

// Components
const TypeWriterText = ({ content, delay, style }) => (
  <TypeWriter typing={1} initialDelay={delay} minDelay={50} maxDelay={100} style={style}>
    {content}
  </TypeWriter>
);

const IntroText = () => (
  <View style={styles.textContainer}>
    <TypeWriterText content="Hello!" delay={0} style={styles.titleText} />
    <TypeWriterText content="I'm Seth" delay={300} style={styles.titleText} />
  </View>
);

const Links = () => (
  <View style={styles.linksContainer}>
    {LINKS.map((link, index) => (
      <TouchableOpacity key={index} onPress={() => Linking.openURL(link.url)} style={styles.linkButton}>
        <TypeWriterText content={link.title} delay={600 + index * 200} style={styles.linkText} />
      </TouchableOpacity>
    ))}
  </View>
);

// Main App component
export default function App() {
  return (
    <View style={styles.container}>
      <ImageBackground source={IMAGE_SOURCE} resizeMode="cover" style={styles.image}>
        <View style={styles.overlay}>
          <View style={styles.contentContainer}>
            <IntroText />
            <Links />
          </View>
        </View>
      </ImageBackground>
      <StatusBar style="light" />
    </View>
  );
}

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
  },
  image: {
    flex: 1,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  contentContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 30, // Increased margin to accommodate larger text
  },
  titleText: {
    color: 'white',
    fontSize: 60, // Increased from 32 to 48
    fontWeight: 'bold',
    textAlign: 'center',
    marginVertical: 5, // Added some vertical margin between lines
  },
  linksContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
  },
  linkButton: {
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingVertical: 10, // Slightly increased for better touch area
    paddingHorizontal: 20, // Slightly increased for better proportions
    borderRadius: 25, // Increased to maintain rounded look with larger buttons
    margin: 8, // Slightly increased for more space between buttons
  },
  linkText: {
    color: 'white',
    fontSize: 18, // Slightly increased from 16 to 18
    fontWeight: 'bold',
  },
});