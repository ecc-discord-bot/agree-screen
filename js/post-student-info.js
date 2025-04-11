export async function postStudentInfo(userName, userClass) {
  const res = await fetch("http://localhost:3000/add", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ studentName: userName, studentClass: userClass }),
  });

  if (!res.ok) throw new Error("POST /add failed");
  return await res.json();
}
