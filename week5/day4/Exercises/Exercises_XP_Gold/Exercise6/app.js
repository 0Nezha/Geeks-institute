const promptuser=prompt("Enter your full name (First and Last name, each starting with a capital letter): ");
  const regex = /^[A-Z][a-z]+ [A-Z][a-z]+$/;
  if (regex.test(promptuser)) {
    console.log("✅ Valid full name!");
  } else {
    console.log("❌ Invalid full name!");
  }
  rl.close();
