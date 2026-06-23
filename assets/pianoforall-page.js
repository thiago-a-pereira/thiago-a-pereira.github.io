(function () {
  const selected = new Map();
  const result = document.querySelector(".pf-quiz-result");
  const options = Array.from(document.querySelectorAll(".pf-quiz-options button"));

  function updateResult() {
    if (!result) return;

    const scores = Array.from(selected.values());
    if (scores.length < 2) {
      result.innerHTML = "<strong>Pick two answers to get a fit signal.</strong><span>No purchase decision should be made before checking the official page.</span>";
      return;
    }

    const total = scores.reduce(function (sum, score) {
      return sum + score;
    }, 0);

    if (total >= 3) {
      result.innerHTML = "<strong>Strong fit signal.</strong><span>Pianoforall is worth checking if you want a structured, self-paced way to start. Verify the official price and refund terms before buying.</span>";
      return;
    }

    if (total >= 1) {
      result.innerHTML = "<strong>Possible fit.</strong><span>Look at the official course details, but compare it with apps or free lessons if you mainly need motivation.</span>";
      return;
    }

    result.innerHTML = "<strong>Weak fit signal.</strong><span>You may be better served by live lessons or direct coaching before buying a self-paced course.</span>";
  }

  options.forEach(function (button) {
    button.addEventListener("click", function () {
      const group = button.closest(".pf-quiz-question");
      if (!group) return;

      Array.from(group.querySelectorAll("button")).forEach(function (candidate) {
        candidate.classList.remove("selected");
      });

      button.classList.add("selected");
      selected.set(group, Number(button.dataset.score || 0));
      updateResult();
    });
  });
})();
