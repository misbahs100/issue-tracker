
document.getElementById('issueInputForm').addEventListener('submit', submitIssue);

function submitIssue(e) {
  const getInputValue = id => document.getElementById(id).value;
  const description = getInputValue('issueDescription');
  
  const severity = getInputValue('issueSeverity');
  const assignedTo = getInputValue('issueAssignedTo');
  const id = Math.floor(Math.random() * 100000000) + '';
  const status = 'Open';

  const issue = { id, description, severity, assignedTo, status };
  let issues = [];
  if (localStorage.getItem('issues')) {
    issues = JSON.parse(localStorage.getItem('issues'));
  }
  issues.push(issue);
  localStorage.setItem('issues', JSON.stringify(issues));

  document.getElementById('issueInputForm').reset();
  // fetchIssues();
  fetchIssues(id, description, severity, assignedTo, status);
  // e.preventDefault();
}

const closeIssue = id => {

  const issues = JSON.parse(localStorage.getItem('issues'));
  // console.log("issues: ", issues[0].id);
  const currentIssue = issues.find(issue => issue.id == id);
  console.log("currentIssue: ", currentIssue);
  currentIssue.status = 'Closed';
  document.getElementById("status" + id).innerText = currentIssue.status;
  const description = document.getElementById("description" + id).innerText;
  console.log("close descr: ", description);
  document.getElementById("description" + id).innerHTML = `
    <del>${description}</del>
  `;
  localStorage.setItem('issues', JSON.stringify(issues));

  // let issueCount = parseFloat(document.getElementById("issueCount").innerText)-1;
  // document.getElementById("issueCount").innerText = issueCount;

  // fetchIssues();
  const count =  statusClosed();
  console.log("cccc: ", count);
  document.getElementById("unresolvedIssueCount").innerText = count;
}

const deleteIssue = id => {
  let issues = JSON.parse(localStorage.getItem('issues'));
  // const currentIssue = issues.find(issue => issue.id == id);
  console.log("issues: ", issues);
  const remainingIssues = issues.filter(issue => issue.id != id);
  console.log("remaining issues: ", remainingIssues);
  document.getElementById(id).style.display = "none";

  localStorage.setItem('issues', JSON.stringify(remainingIssues));
  issues = JSON.parse(localStorage.getItem('issues'));
  document.getElementById("unresolvedIssueCount").innerText = statusClosed();
  document.getElementById("totalIssueCount").innerText = issues.length;
  localStorage.setItem('issues', JSON.stringify(issues));
  // fetchIssues();


}

const fetchIssues = (id = "not-From-Body", description, severity, assignedTo, status) => {
  console.log("hello3");
  const issues = JSON.parse(localStorage.getItem('issues'));
  console.log(":: ", issues);
  
  document.getElementById("unresolvedIssueCount").innerText = statusClosed();
  document.getElementById("totalIssueCount").innerText = issues.length;

  const issuesList = document.getElementById('issuesList');
  issuesList.innerHTML = '';

  for (var i = 0; i < issues.length; i++) {
    const { id, description, severity, assignedTo, status } = issues[i];
    if (id != "not-From-Body") {
      issuesList.innerHTML += `<div id="${id}" class="well">
                              <h6>Issue ID: ${id} </h6>
                              <p><span id="status${id}" class="label label-info"> ${status} </span></p>
                              <h3 id="description${id}"> ${description} </h3>
                              <p><span class="glyphicon glyphicon-time"></span> ${severity}</p>
                              <p><span class="glyphicon glyphicon-user"></span> ${assignedTo}</p>
                              <a href="#" onclick="closeIssue(${id})" class="btn btn-warning">Close</a>
                              <a href="#" onclick="deleteIssue(${id})" class="btn btn-danger">Delete</a>
                              </div>`;
    }

  }

}


function statusClosed(){
  const issues = JSON.parse(localStorage.getItem('issues'));
  let count = 0;
  for(var i=0;i<issues.length; i++){
    if(issues[i].status  == "Closed")  count++;
  }
  return issues.length - count;
}

