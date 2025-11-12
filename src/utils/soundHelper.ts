<<<<<<< HEAD
// Sound effects utilities
export const soundHelper = {
  // Play completion sound
  playCompletionSound: () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 800;
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.3, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.5);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.5);
  },

  // Play tick sound
  playTickSound: () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 400;
    oscillator.type = 'square';
    gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.1);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.1);
  },

  // Play notification beep
  playNotificationBeep: () => {
    const audioContext = new (window.AudioContext || (window as any).webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const gainNode = audioContext.createGain();

    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);

    oscillator.frequency.value = 1000;
    oscillator.type = 'sine';
    gainNode.gain.setValueAtTime(0.2, audioContext.currentTime);
    gainNode.gain.exponentialRampToValueAtTime(0.01, audioContext.currentTime + 0.3);

    oscillator.start(audioContext.currentTime);
    oscillator.stop(audioContext.currentTime + 0.3);
  },
};
=======
// utils/soundHelper.ts - COMPLETE v7.6
class SoundHelper {
  private audioContext: AudioContext | null = null;
  private initialized = false;

  /**
   * Initialize the AudioContext
   * Must be called after user interaction (browser restriction)
   */
  init() {
    if (this.initialized) {
      console.log('✅ AudioContext already initialized');
      return;
    }
    
    try {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      this.audioContext = new AudioContextClass();
      this.initialized = true;
      console.log('✅ AudioContext initialized successfully');
    } catch (error) {
      console.error('❌ Failed to initialize AudioContext:', error);
    }
  }

  /**
   * Check if audio is ready
   */
  isReady(): boolean {
    return this.initialized && this.audioContext !== null;
  }

  /**
   * Play a beep tone
   * @param frequency - Frequency in Hz (e.g., 440 for A4)
   * @param duration - Duration in seconds
   * @param volume - Volume from 0 to 1
   */
  private playBeep(frequency: number, duration: number, volume: number = 0.3) {
    if (!this.audioContext) {
      console.warn('⚠️ AudioContext not initialized. Call init() first.');
      return;
    }

    try {
      const oscillator = this.audioContext.createOscillator();
      const gainNode = this.audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(this.audioContext.destination);

      oscillator.frequency.value = frequency;
      oscillator.type = 'sine';

      gainNode.gain.setValueAtTime(volume, this.audioContext.currentTime);
      gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + duration);

      oscillator.start(this.audioContext.currentTime);
      oscillator.stop(this.audioContext.currentTime + duration);

      console.log(`🔊 Playing beep: ${frequency}Hz for ${duration}s at volume ${volume}`);
    } catch (error) {
      console.error('❌ Error playing beep:', error);
    }
  }

  /**
   * Play success sound (work session complete)
   * 3 ascending tones: C5 -> E5 -> G5
   */
  playSuccessSound(volume: number = 0.7) {
    if (!this.isReady()) {
      console.warn('⚠️ AudioContext not ready for success sound');
      return;
    }

    console.log('🎉 Playing success sound (work complete)');
    this.playBeep(523, 0.15, volume); // C5
    setTimeout(() => this.playBeep(659, 0.15, volume), 150); // E5
    setTimeout(() => this.playBeep(784, 0.25, volume), 300); // G5
  }

  /**
   * Play break sound (short break complete)
   * 2 ascending tones: D4 -> A4
   */
  playBreakSound(volume: number = 0.7) {
    if (!this.isReady()) {
      console.warn('⚠️ AudioContext not ready for break sound');
      return;
    }

    console.log('☕ Playing break sound (short break complete)');
    this.playBeep(587, 0.2, volume); // D5
    setTimeout(() => this.playBeep(740, 0.2, volume), 200); // F#5
  }

  /**
   * Play long break sound (long break complete)
   * 4 ascending tones: A4 -> C5 -> E5 -> A5
   */
  playLongBreakSound(volume: number = 0.7) {
    if (!this.isReady()) {
      console.warn('⚠️ AudioContext not ready for long break sound');
      return;
    }

    console.log('🌟 Playing long break sound (long break complete)');
    this.playBeep(440, 0.15, volume); // A4
    setTimeout(() => this.playBeep(523, 0.15, volume), 150); // C5
    setTimeout(() => this.playBeep(659, 0.15, volume), 300); // E5
    setTimeout(() => this.playBeep(880, 0.25, volume), 450); // A5
  }

  /**
   * Play tick sound (optional for timer ticking)
   */
  playTickSound(volume: number = 0.1) {
    if (!this.isReady()) return;
    this.playBeep(800, 0.05, volume);
  }

  /**
   * Test the audio system
   */
  testAudio() {
    if (!this.isReady()) {
      console.error('❌ AudioContext not initialized. Cannot test audio.');
      return;
    }

    console.log('🧪 Testing audio system...');
    this.playSuccessSound(0.5);
    
    setTimeout(() => {
      console.log('✅ Audio test complete');
    }, 1000);
  }

  /**
   * Resume AudioContext if suspended (for iOS/Safari)
   */
  async resume() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      try {
        await this.audioContext.resume();
        console.log('✅ AudioContext resumed');
      } catch (error) {
        console.error('❌ Failed to resume AudioContext:', error);
      }
    }
  }

  /**
   * Get current AudioContext state
   */
  getState(): string {
    if (!this.audioContext) return 'not initialized';
    return this.audioContext.state;
  }
}

// Export singleton instance
export const soundHelper = new SoundHelper();
>>>>>>> d2c9fcc (update v7.6 and lot of improvements)
