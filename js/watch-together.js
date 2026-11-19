// js/watch-together.js
import { openModal, closeModal } from './animations.js';

const modal = document.getElementById('watchTogetherModal');

// Make a random 6-char code (letters + numbers).
function randomCode() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let code = '';
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return code;
}

export function initWatchTogether() {
  if (!modal) return;

  const openBtn = document.getElementById('watchTogetherBtn');
  const closeBtn = document.getElementById('wtClose');
  const createBtn = document.getElementById('wtCreateBtn');
  const codeBox = document.getElementById('wtCode');
  const codeValue = document.getElementById('wtCodeValue');
  const copyBtn = document.getElementById('wtCopyBtn');
  const joinInput = document.getElementById('wtJoinInput');
  const joinBtn = document.getElementById('wtJoinBtn');
  const message = document.getElementById('wtMessage');

  if (openBtn) openBtn.addEventListener('click', () => openModal(modal));
  if (closeBtn) closeBtn.addEventListener('click', () => closeModal(modal));

  // Close when clicking outside the modal box.
  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal(modal);
  });

  createBtn.addEventListener('click', () => {
    const code = randomCode();
    codeValue.textContent = code;
    codeBox.hidden = false;
    message.hidden = true;
  });

  copyBtn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(codeValue.textContent);
      copyBtn.textContent = 'Copied!';
      setTimeout(() => (copyBtn.textContent = 'Copy code'), 1500);
    } catch {
      // Fallback if clipboard API is blocked
      copyBtn.textContent = 'Copy failed';
    }
  });

  joinBtn.addEventListener('click', () => {
    const code = joinInput.value.trim().toUpperCase();
    if (code.length !== 6) {
      message.textContent = 'Please enter a 6-character code.';
      message.hidden = false;
      return;
    }
    message.textContent = `Joined room ${code}`;
    message.hidden = false;
  });
}