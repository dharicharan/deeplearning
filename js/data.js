/* ==========================================================================
   Neural Networks Visual Notes — Data Layer
   ========================================================================== */

const WEEKS_ORDER = [
  "week-1", "week-2", "week-3", "week-4", "week-5", "week-6", "week-7", "week-8"
];

const WEEKS_META = {
  "week-1": { badge: "Week 1", title: "Foundations of Neural Networks" },
  "week-2": { badge: "Week 2", title: "Perceptron Learning Rule & Weight Updates" },
  "week-3": { badge: "Week 3", title: "Linear Separability & the XOR Limitation" },
  "week-4": { badge: "Week 4", title: "Multilayer Perceptrons & Backpropagation" },
  "week-5": { badge: "Week 5", title: "Activation Functions & Loss Functions" },
  "week-6": { badge: "Week 6", title: "Optimization: Gradient Descent & Variants" },
  "week-7": { badge: "Week 7", title: "Regularization & Generalization" },
  "week-8": { badge: "Week 8", title: "Capstone Review & Integrated Practice" }
};

const NOTES_DATA = {
  "week-1": {
    practice: [
      {
        id: "q1",
        title: "Question 1: Biological Neuron Processing",
        pill: "Correct Answer: B. Soma",
        question: "Which component of a biological neuron is primarily responsible for processing information received from other neurons?",
        options: "A. Dendrites | B. Soma | C. Axon | D. Synapses",
        correct: "B. Soma",
        theory: [
          "Dendrites (Inputs): Receive chemical and electrical signals from neighboring neurons.",
          "Soma (Processor): Sums and processes incoming signals from dendrites. If the accumulated potential exceeds a threshold, it initiates an action potential.",
          "Axon (Transmitter): Conducts the generated action potential away from the soma toward other neurons.",
          "Synapses (Connectors/Weights): Junction gaps where signals pass from one neuron to another. Synaptic strengths correspond to weights w in artificial neural networks."
        ],
        analogy: "Dendrites are analog sensor pins, the Soma is the microcontroller summing volt thresholds, and the Axon is the outgoing digital interrupt line.",
        canvas: true,
        canvasId: "cv-q1",
        interactive: true
      },
      {
        id: "q2",
        title: "Questions 2 & 3: MP Neuron Threshold & Inhibitory Veto",
        pill: "θ = 2 | Inhibitory Veto",
        question: "A user buys the phone (y = 1) if at least two specifications are present, but strictly rejects (y = 0) if it is not made in India. Find suitable threshold θ and identify the inhibitory input.",
        options: "Q2: A. 1 | B. 0 | C. 2 | D. 3 | E. 4<br>Q3: A. Price | B. 5G support | C. not made in India | D. None of those",
        correct: "Q2: C. θ = 2<br>Q3: C. not made in India",
        theory: [
          "θ = 2 encodes the 'at least any two' logical criterion.",
      {
        id: "q8",
        title: "Question 8: Perceptron Updates on OR (Zero Bias)",
        pill: "Correct: A. 0 Updates",
        question: "Initial weights w = [1, 1]^T, decision rule: y = 1 if w^T x > 0 else 0. How many times does w get updated on the OR dataset?",
        options: "A. 0 | B. 1 | C. 2 | D. 3 | E. Not possible to decide",
        correct: "A. 0",
        theory: [
          "The perceptron learning rule updates weights only upon misclassification (ŷ ≠ y):",
          "x = [0, 0]^T ⇒ 1(0) + 1(0) = 0 > 0 ⇒ ŷ = 0 (True y=0 → Correct)",
          "x = [0, 1]^T ⇒ 1(0) + 1(1) = 1 > 0 ⇒ ŷ = 1 (True y=1 → Correct)",
          "x = [1, 0]^T ⇒ 1(1) + 1(0) = 1 > 0 ⇒ ŷ = 1 (True y=1 → Correct)",
          "x = [1, 1]^T ⇒ 1(1) + 1(1) = 2 > 0 ⇒ ŷ = 1 (True y=1 → Correct)",
          "Zero misclassifications ⇒ 0 updates required."
        ],
        analogy: null,
        canvas: true,
        canvasId: "cv-q8",
        interactive: false
      },
      {
        id: "q9",
        title: "Question 9: Perceptron Convergence on NAND (No Bias)",
        pill: "Correct: B. Never Converges",
        question: "For NAND: (0,0)→1, (0,1)→1, (1,0)→1, (1,1)→0 with b = 0, does the perceptron converge?",
        options: "A. The algorithm converges after some iterations | B. The algorithm never converges | C. The classification error becomes zero eventually | D. The classification error remains greater than zero",
        correct: "B. Never converges (select B if single-choice; D is also true)",
        theory: [
          "Because b = 0, the hyperplane w^T x = 0 is anchored through the origin (0,0).",
          "Evaluating the origin: w^T [0, 0]^T ≡ 0, which can never satisfy the strict condition > 0.",
          "Thus, the point (0,0) can never be assigned label 1, violating the NAND target.",
          "By the Perceptron Convergence Theorem, linear separability is a strict requirement for termination; without bias, NAND is linearly inseparable → the algorithm enters an infinite loop."
        ],
        analogy: null,
        canvas: true,
        canvasId: "cv-q9",
        interactive: false
      },
      {
        id: "q10",
        title: "Question 10: Orthogonality of Weight Vector",
        pill: "Correct: A. True",
        question: '"In the perceptron model, the weight vector w is always orthogonal to the linear decision boundary."',
        options: "A. True | B. False",
        correct: "A. True",
        theory: [
          "Let x1 and x2 be any two points lying on the decision boundary: w^T x1 + b = 0 and w^T x2 + b = 0",
          "Subtracting the two equations yields: w^T(x1 − x2) = 0",
          "Since (x1 − x2) is a vector parallel to the decision boundary, their dot product being zero confirms that w is strictly orthogonal (normal) to the surface."
        ],
        analogy: null,
        canvas: true,
        canvasId: "cv-q10",
        interactive: true
      }
    ]
      {
        id: "q8",
        title: "Question 8: Perceptron Updates on OR (Zero Bias)",
        pill: "Correct: A. 0 Updates",
        question: "Initial weights w = [1, 1]^T, decision rule: y = 1 if w^T x > 0 else 0. How many times does w get updated on the OR dataset?",
        options: "A. 0 | B. 1 | C. 2 | D. 3 | E. Not possible to decide",
        correct: "A. 0",
        theory: [
      {
        id: "w2-p1",
        title: "Question 1: Perceptron Weight Update Calculation",
        pill: "Correct: Δw = η (y − ŷ) x",
        question: "Given a training sample x = [2, 3]^T with true label y = 1, predicted label ŷ = 0, and learning rate η = 0.5, what is the weight update Δw?",
        options: "A. [1, 1.5]^T | B. [2, 3]^T | C. [1, 1.5]^T | D. [0.5, 0.75]^T",
        correct: "A. [1, 1.5]^T",
        theory: [
          "Perceptron update rule: Δw = η (y − ŷ) x",
          "Error: y − ŷ = 1 − 0 = 1",
          "Δw = 0.5 × 1 × [2, 3]^T = [1, 1.5]^T",
          "The weight vector moves in the direction of the input vector scaled by the error and learning rate."
        ],
        analogy: "Like adjusting a thermostat: if the room is too cold (error = 1), you increase the heat setting proportionally (learning rate × error × input).",
        canvas: true,
        canvasId: "cv-w2p1",
      {
        id: "w2-g1",
        title: "Question 1: Number of Perceptron Updates on OR",
        pill: "Correct: A. 0 Updates",
        question: "Initial weights w = [1, 1]^T, decision rule: y = 1 if w^T x > 0 else 0. How many times does w get updated on the OR dataset?",
        options: "A. 0 | B. 1 | C. 2 | D. 3 | E. Not possible to decide",
        correct: "A. 0",
        theory: [
          "The perceptron learning rule updates weights only upon misclassification (ŷ ≠ y):",
          "x = [0, 0]^T ⇒ 1(0) + 1(0) = 0 > 0 ⇒ ŷ = 0 (True y=0 → Correct)",
          "x = [0, 1]^T ⇒ 1(0) + 1(1) = 1 > 0 ⇒ ŷ = 1 (True y=1 → Correct)",
          "x = [1, 0]^T ⇒ 1(1) + 1(0) = 1 > 0 ⇒ ŷ = 1 (True y=1 → Correct)",
          "x = [1, 1]^T ⇒ 1(1) + 1(1) = 2 > 0 ⇒ ŷ = 1 (True y=1 → Correct)",
          "Zero misclassifications ⇒ 0 updates required."
        ],
        analogy: null,
        canvas: true,
        canvasId: "cv-w2g1",
        interactive: false
      },
      {
        id: "w2-g2",
        title: "Question 2: Perceptron Convergence Theorem Conditions",
        pill: "Correct: B. Data must be linearly separable",
        question: "Under what conditions does the Rosenblatt perceptron learning algorithm guarantee convergence?",
        options: "A. Always converges | B. Data must be linearly separable | C. Learning rate must be less than 0.01 | D. Zero bias is required",
        correct: "B. Data must be linearly separable",
        theory: [
          "Novikoff's Theorem: If a dataset has a positive margin γ and bounded radius R, the algorithm makes at most (R/γ)^2 mistakes.",
          "If the data is inseparable, the weight vector will oscillate perpetually.",
          "The theorem requires: (1) data is linearly separable, (2) input vectors have bounded norm, (3) learning rate η > 0."
        ],
        analogy: "Like calibrating a thermostat: if the target temperature is achievable, it stabilizes; if the target is contradictory, the heater keeps flipping on and off forever.",
        canvas: true,
        canvasId: "cv-w2g2",
        interactive: false
      },
      {
        id: "w2-g3",
        title: "Question 3: Learning Rate Too High — Oscillation",
        pill: "Correct: C. Weight vector oscillates around solution",
        question: "What happens when the learning rate η is set too high in perceptron learning?",
        options: "A. Convergence is faster | B. Weights become zero | C. Weight vector oscillates around solution | D. Algorithm terminates immediately",
        correct: "C. Weight vector oscillates around solution",
        theory: [
          "A very large learning rate causes the weight update to overshoot the optimal solution.",
          "Instead of settling at the minimum, the weight vector bounces back and forth across the decision boundary.",
          "This leads to oscillation and prevents convergence even when data is linearly separable."
        ],
        analogy: "Like trying to park a car with the gas pedal floored: you zoom past the parking spot and have to reverse, then overshoot again.",
        canvas: true,
        canvasId: "cv-w2g3",
        interactive: false
      }
    ]
  },

  // ==================== WEEKS 3–8 (SCAFFOLDS) ====================
  "week-3": { practice: [], graded: [] },
  "week-4": { practice: [], graded: [] },
  "week-5": { practice: [], graded: [] },
  "week-6": { practice: [], graded: [] },
  "week-7": { practice: [], graded: [] },
  "week-8": { practice: [], graded: [] }
};
        interactive: true
      },
      {
        id: "w2-p2",
        title: "Question 2: Effect of Learning Rate on Convergence",
        pill: "Correct: A. Larger η → faster but may overshoot",
        question: "How does increasing the learning rate η affect perceptron convergence?",
        options: "A. Larger η → faster but may overshoot | B. Larger η → slower convergence | C. η has no effect on convergence speed | D. Larger η → guaranteed convergence",
        correct: "A. Larger η → faster but may overshoot",
        theory: [
          "A larger learning rate takes bigger steps toward the solution, potentially converging in fewer iterations.",
          "However, if η is too large, the weight vector may overshoot the optimal solution and oscillate.",
          "The perceptron convergence theorem guarantees convergence for any positive η when data is linearly separable, but the number of updates depends on η."
        ],
        analogy: "Like walking toward a target: big steps get you closer faster, but if you step too far you might overshoot and have to walk back.",
        canvas: true,
        canvasId: "cv-w2p2",
        interactive: false
      },
      {
        id: "w2-p3",
        title: "Question 3: Bias Term Role in Perceptron",
        pill: "Correct: B. Shifts the decision boundary",
        question: "What is the primary role of the bias term b in the perceptron decision function y = sign(w^T x + b)?",
        options: "A. Scales the weight vector | B. Shifts the decision boundary | C. Changes the learning rate | D. Normalizes input features",
        correct: "B. Shifts the decision boundary",
        theory: [
          "The bias term b (or equivalently, w_0 with input x_0 = 1) allows the decision boundary to be shifted away from the origin.",
          "Without bias, the decision boundary must pass through the origin, limiting the set of linearly separable functions (e.g., NAND cannot be learned).",
          "The bias effectively adds a degree of freedom, making the perceptron more expressive."
        ],
        analogy: "Like adjusting the threshold of a motion sensor: the bias shifts when the sensor triggers, independent of the sensor's sensitivity (weights).",
        canvas: true,
        canvasId: "cv-w2p3",
        interactive: false
      },
      {
        id: "w2-p4",
        title: "Question 4: Perceptron Decision Region Visualization",
        pill: "Correct: A. 2 Regions",
        question: "A single perceptron divides the input space into how many decision regions?",
        options: "A. 2 Regions | B. 3 Regions | C. 4 Regions | D. It depends on the dimension",
        correct: "A. 2 Regions",
        theory: [
          "A single linear decision boundary (hyperplane) divides the input space into exactly 2 half-spaces.",
          "The decision boundary is defined by w^T x + b = 0.",
          "This holds regardless of dimension: d dimensions → (d-1)-dimensional hyperplane → 2 regions."
        ],
        analogy: "Like a single straight line on a piece of paper: it always divides the paper into exactly 2 parts, no matter how you tilt or position it.",
        canvas: true,
        canvasId: "cv-w2p4",
        interactive: false
      }
    ],
    graded: [
          "The perceptron learning rule updates weights only upon misclassification (ŷ ≠ y):",
          "x = [0, 0]^T ⇒ 1(0) + 1(0) = 0 > 0 ⇒ ŷ = 0 (True y=0 → Correct)",
          "x = [0, 1]^T ⇒ 1(0) + 1(1) = 1 > 0 ⇒ ŷ = 1 (True y=1 → Correct)",
          "x = [1, 0]^T ⇒ 1(1) + 1(0) = 1 > 0 ⇒ ŷ = 1 (True y=1 → Correct)",
          "x = [1, 1]^T ⇒ 1(1) + 1(1) = 2 > 0 ⇒ ŷ = 1 (True y=1 → Correct)",
          "Zero misclassifications ⇒ 0 updates required."
        ],
        analogy: null,
        canvas: true,
        canvasId: "cv-q8",
        interactive: false
      },
      {
        id: "q9",
        title: "Question 9: Perceptron Convergence on NAND (No Bias)",
        pill: "Correct: B. Never Converges",
        question: "For NAND: (0,0)→1, (0,1)→1, (1,0)→1, (1,1)→0 with b = 0, does the perceptron converge?",
        options: "A. The algorithm converges after some iterations | B. The algorithm never converges | C. The classification error becomes zero eventually | D. The classification error remains greater than zero",
        correct: "B. Never converges (select B if single-choice; D is also true)",
        theory: [
          "Because b = 0, the hyperplane w^T x = 0 is anchored through the origin (0,0).",
          "Evaluating the origin: w^T [0, 0]^T ≡ 0, which can never satisfy the strict condition > 0.",
          "Thus, the point (0,0) can never be assigned label 1, violating the NAND target.",
          "By the Perceptron Convergence Theorem, linear separability is a strict requirement for termination; without bias, NAND is linearly inseparable → the algorithm enters an infinite loop."
        ],
        analogy: null,
        canvas: true,
        canvasId: "cv-q9",
        interactive: false
      },
      {
        id: "q10",
        title: "Question 10: Orthogonality of Weight Vector",
        pill: "Correct: A. True",
        question: '"In the perceptron model, the weight vector w is always orthogonal to the linear decision boundary."',
        options: "A. True | B. False",
        correct: "A. True",
        theory: [
          "Let x1 and x2 be any two points lying on the decision boundary: w^T x1 + b = 0 and w^T x2 + b = 0",
          "Subtracting the two equations yields: w^T(x1 − x2) = 0",
          "Since (x1 − x2) is a vector parallel to the decision boundary, their dot product being zero confirms that w is strictly orthogonal (normal) to the surface."
        ],
        analogy: null,
        canvas: true,
        canvasId: "cv-q10",
        interactive: true
      }
    ]
  },

  // ==================== WEEK 2 ====================
  "week-2": {
    practice: [
  },

  // ==================== WEEK 2 ====================
  "week-2": {
    practice: [
          "If 'not made in India' = 1, it activates the veto terminal, pulling the output down to 0 regardless of how large the excitatory sum is."
        ],
        analogy: "Excitatory inputs = High transaction amount, unusual location, new device (requires ≥ 2 flags to approve). Inhibitory input = 'Card reported stolen' (instantly blocks transaction, no matter what).",
        canvas: true,
        canvasId: "cv-q2",
        interactive: true
      }
    ],
    graded: [