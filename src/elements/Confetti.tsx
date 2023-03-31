import confetti from "canvas-confetti";

const Confetti = () => {
  return confetti({
    particleCount: 150,
    spread: 60
  })
}

export default Confetti;