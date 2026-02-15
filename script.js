// 適正体重計算式（BMI22基準）
// 男性・女性ともに「身長(m)×身長(m)×22」
// 参考: https://www.e-healthnet.mhlw.go.jp/information/dictionary/metabolic/ym-002.html
// 年齢・性別によるBMIの目安範囲も考慮

const form = document.getElementById('weightForm');
const resultDiv = document.getElementById('result');
const errorDiv = document.getElementById('error');
const resetBtn = document.getElementById('resetBtn');

function getBMIRange(age, gender) {
  // 厚生労働省等の統計を参考にした一般的なBMI適正範囲
  // 18歳以上: 男性 20～24、女性 19～24
  // 18歳未満: 18.5～24（男女共通）
  if (age < 18) {
    return { min: 18.5, max: 24 };
  }
  if (gender === 'male') {
    return { min: 20, max: 24 };
  } else {
    return { min: 19, max: 24 };
  }
}

function validateInput(age, gender, height) {
  if (!age || isNaN(age) || age < 0 || age > 120) {
    return '年齢は0～120の数字で入力してください。';
  }
  if (!gender || (gender !== 'male' && gender !== 'female')) {
    return '性別を選択してください。';
  }
  if (!height || isNaN(height) || height < 100 || height > 250) {
    return '身長は100～250cmの数字で入力してください。';
  }
  return '';
}

form.addEventListener('submit', function(e) {
  e.preventDefault();
  errorDiv.textContent = '';
  resultDiv.textContent = '';

  const age = parseInt(form.age.value, 10);
  const gender = form.gender.value;
  const height = parseFloat(form.height.value);

  const errorMsg = validateInput(age, gender, height);
  if (errorMsg) {
    errorDiv.textContent = errorMsg;
    return;
  }

  // 身長(m)に変換
  const heightM = height / 100;
  const bmiRange = getBMIRange(age, gender);
  const minWeight = (heightM * heightM * bmiRange.min).toFixed(1);
  const maxWeight = (heightM * heightM * bmiRange.max).toFixed(1);

  resultDiv.textContent = `あなたの適正体重の範囲は約${minWeight} kg～${maxWeight} kgです`;
});

resetBtn.addEventListener('click', function() {
  form.reset();
  errorDiv.textContent = '';
  resultDiv.textContent = '';
});
