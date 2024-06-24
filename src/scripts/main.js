import Swal from "sweetalert2";

function main() {
  const api = "https://notes-api.dicoding.dev/v2";
  const getNotes = async () => {
    // tuliskan kode di sini!
    const response = await fetch(`${api}/notes`);
    const responseJSON = await response.json();

    if (responseJSON.error) {
      showResponseMessage(responseJSON.message);
    } else {
      // console.log(responseJSON.data);
      renderAllNotes(responseJSON.data);
    }
  };

  const insertnote = async (note) => {
    // tuliskan kode di sini!
    try {
      const options = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(note),
      };

      const response = await fetch(`${api}/notes`, options);
      const responseJson = await response.json();
      // showResponseMessage(responseJson.message);
      console.log(responseJson);
      messageData(responseJson.message);
      getNotes();
    } catch (error) {
      console.log(error);
    }
  };

  const removenote = async (noteId) => {
    // tuliskan kode di sini!
    try {
      const options = {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(noteId),
      };
      const response = await fetch(`${api}/notes/${noteId}`, options);
      const responseJson = await response.json();
      console.log(responseJson);
      // showResponseMessage(responseJson.message);
      if (responseJson.status == "success") {
        messageDelete(responseJson.message);
      }
      getNotes();
    } catch (error) {
      showResponseMessage(error);
    }
  };

  /*
      jangan ubah kode di bawah ini ya!
  */

  const renderAllNotes = (notes) => {
    const listBookElement = document.querySelector("#listnote");
    listBookElement.innerHTML = "";
    // console.log(notes);
    notes.map((note) => {
      // console.log(`ini note`, note);
      const formattedDate = formatDate(note.createdAt);
      listBookElement.innerHTML += `
        <div class="note-item">
            <div class="note-header">
              <h1 class="note-item-title">${note.title}</h1>
              <p class="note-item-date">${formattedDate}</p>

              <p class="note-item-body">
                ${note.body}.
              </p>

              <button class="btn btn-danger button-delete mt-5" id="${note.id}">Delete</button>
            </div>
        </div>
          `;
    });

    const buttons = document.querySelectorAll(".button-delete");
    buttons.forEach((button) => {
      button.addEventListener("click", (event) => {
        const noteId = event.target.id;
        // messageDelete(removenote(noteId));
        // removenote(noteId);

        messageDelete(noteId);
        console.log(messageDelete(noteId));
      });
    });
  };

  const formatDate = (dateString) => {
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "numeric",
      // minute: "numeric",
      // second: "numeric",
    };
    return new Date(dateString).toLocaleDateString("en-US", options);
  };

  const showResponseMessage = (message = "Check your internet connection") => {
    // alert(message);
    Swal.fire({
      icon: "error",
      title: "Oops...",
      text: `Something went wrong! ${message}`,
    });
  };

  const messageData = (message = "Check your internet connection") => {
    Swal.fire({
      position: "top-end",
      icon: "success",
      title: ` ${message}`,
      showConfirmButton: false,
      timer: 1500,
    });
  };

  const messageDelete = async (message = "Check your internet connection") => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await removenote(message);
        Swal.fire({
          title: "Deleted!",
          text: `${message}`,
          icon: "success",
        });
      } catch (error) {
        Swal.fire({
          title: "Error!",
          text: "An error occurred while deleting the note.",
          icon: "error",
        });
      }
    }
  };

  document.addEventListener("DOMContentLoaded", () => {
    const noteForm = document.getElementById("form");

    // const inputnoteId = document.querySelector("#inputnoteId");
    const inputnoteTitle = document.querySelector("#inputnoteTitle");
    const inputnoteBody = document.querySelector("#inputnoteBody");
    const buttonSave = document.querySelector("#buttonSave");

    noteForm.addEventListener("submit", (event) => {
      event.preventDefault();
      const randomText =
        generateRandomString(10) + "-" + generateRandomString(10);

      buttonSave.addEventListener("click", async function () {
        const loadingIndicator = document.getElementById("loadingIndicator");
        loadingIndicator.classList.remove("d-none");
        loadingIndicator.classList.add("d-flex");

        try {
          const note = {
            // id: `note-${randomText}`,
            title: inputnoteTitle.value,
            body: inputnoteBody.value,
            // archived: false,
            // createdAt: new Date().toISOString(),
          };

          await insertnote(note);
          loadingIndicator.classList.remove("d-flex");
          loadingIndicator.classList.add("d-none");
          resetForm();
        } catch (error) {
          console.log(error);
          loadingIndicator.style.display = "none";
        }
      });
    });

    function generateRandomString(length) {
      const characters =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789_-";
      let result = "";
      for (let i = 0; i < length; i++) {
        result += characters.charAt(
          Math.floor(Math.random() * characters.length)
        );
      }
      return result;
    }

    const resetForm = () => {
      inputnoteTitle.value = "";
      inputnoteBody.value = "";
    };

    getNotes();
  });
}

export default main;
