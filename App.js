import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View, ImageBackground, TouchableOpacity, Linking, Dimensions } from 'react-native';
import TypeWriter from 'react-native-typewriter';

// Constants
const IMAGE_SOURCE = require('./assets/gradient_waves.gif');
const GITHUB_URL = 'https://github.com/sethmorton';
const LINKEDIN_URL = 'www.linkedin.com/in/seth-morton-118574242';
const RESUME_URL = 'https://drive.google.com/file/d/1ua0vPcUKxvBUyJ9hxhL2Izesj0wwOfdV/view?usp=drive_link';
const { width } = Dimensions.get('window');
// Calculate delays for the links based on the sequence
const LINKS = [
  { title: 'Github', url: GITHUB_URL },
  { title: 'LinkedIn', url: LINKEDIN_URL },
  { title: 'Resume', url: RESUME_URL },
];

const LINK_TEXT_SIZE = 15;
const INTRO_TEXT_SIZE = 30;

// Helper function to calculate the next initial delay based on content length and delay per character
const calculateDelay = (content, delayPerChar = 200, additionalDelay = 0) => content.length * delayPerChar + additionalDelay;
// Helper function to scale text based on screen width and height
const scaleText = (size) => {
  const baseWidth = 350; // Base screen width (e.g., iPhone X screen width)
  const scaleFactor = width / baseWidth; // Adjust text size based on screen width
  const adjustedSize = size * scaleFactor;
  const minSize = 30; // Minimum font size
  const maxSize = 90; // Maximum font size
  return Math.min(Math.max(adjustedSize, minSize), maxSize);
};
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

// Introduction Text Component
const IntroText = () => (
  <View style={styles.textContainer}>
    <TypeWriterText content="Hello!" size={INTRO_TEXT_SIZE} delay={0} />
    <View style={styles.gap} />
    <TypeWriterText content="I'm Seth" size={INTRO_TEXT_SIZE} delay={calculateDelay("Hello!", 200, 500)} />
  </View>
);

// TypeWriter Text Component
const TypeWriterText = ({ content, delay, size }) => (
  <TypeWriter typing={1} initialDelay={delay} minDelay={200} maxDelay={200} style={[styles.text, { fontSize: scaleText(size) }]}>
    <Text style={[styles.text, { fontSize: scaleText(size) }]}>{content}</Text>
  </TypeWriter>
);

// Links Component
const Links = () => {
  let cumulativeDelay = calculateDelay("I'm Seth", 200, 700); // Start after "I'm Seth"
  return (
    <View style={styles.otherTextContainer}>
      {LINKS.map((link, index) => {
        const component = (
          <React.Fragment key={index}>
            {index > 0 && <Text style={[styles.text, { fontSize: scaleText(LINK_TEXT_SIZE) }]}> | </Text>}
            <TouchableOpacity onPress={() => Linking.openURL(link.url)}>
              <TypeWriterText content={link.title} size={LINK_TEXT_SIZE} delay={cumulativeDelay} />
            </TouchableOpacity>
          </React.Fragment>
        );
        cumulativeDelay += calculateDelay(link.title, 300, 400); // Calculate next delay based on current title
        return component;
      })}
    </View>
  );
};

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
    justifyContent: 'flex-start', // Align children to the start of the container
    alignItems: 'center', // Center children horizontally
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    marginTop: '10vh', // Use 10% of the viewport height for margin at the top
  },
  otherTextContainer: {
    position: 'absolute',
    right: 40, // Increased spacing from the right edge for adequate padding
    top: '50%', // Position the container in the middle of the screen vertically
    transform: [{ translateY: -50 }], // Adjust the position to center vertically
    flexDirection: 'row', // Align items vertically
    alignItems: 'center', // Center items horizontally
  },
  text: {
    color: 'white',
    fontWeight: 'bold',
  },
  gap: {
    height: 10,
  },
});