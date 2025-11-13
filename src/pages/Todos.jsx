import { Form, Table, Badge, Button, Modal } from "react-bootstrap";
import { useEffect, useState, useRef } from "react";
import { fetchTodos } from "../data/todos";

const Todos = () => {
  const newIdRef = useRef();
  const newTitleRef = useRef();
  const [todosRaw, setTodosRaw] = useState([]);
  const [todos, setTodos] = useState([]);
  const [onlyWaiting, setOnlyWaiting] = useState(false);
  const [itemPerPage, setItemPerpage] = useState(10);
  const [numPages, setNumPages] = useState(1);
  const [curPage, setCurPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [newTitle, setNewTitle] = useState("");
  //ลบรายการออก
  const deleteTodo = (id) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };
  // เพิ่มรายการใหม่
  const addTodo = () => {
    if (!newTitle.trim()) return;

    const lastId =
      todosRaw.length > 0 ? Math.max(...todosRaw.map((todo) => todo.id)) : 0;

    const newTodo = {
      id: lastId + 1,
      title: newTitle,
      completed: false,
    };

    setTodosRaw([...todosRaw, newTodo]);
    setNewTitle("");
    setShowModal(false);
  };

  //load
  useEffect(() => {
    setTodosRaw(fetchTodos()); // โหลดข้อมูลทั้งหมด
  }, []);

  useEffect(() => {
    const start = (curPage - 1) * itemPerPage;
    const end = start + Number(itemPerPage);

    const filtered = onlyWaiting
      ? todosRaw.filter((todo) => !todo.completed)
      : todosRaw;

    setTodos(filtered.slice(start, end));
    setNumPages(Math.ceil(filtered.length / itemPerPage));
  }, [todosRaw, onlyWaiting, itemPerPage, curPage]);
  useEffect(() => {}, [onlyWaiting]);
  useEffect(() => {
    setNumPages(Math.ceil(todosRaw.length / itemPerPage));
  }, [itemPerPage, todosRaw]);

  const [show, setShow] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const saveClicked = (id, title) => {
    console.log(id, title);
    if (title.trim() !== "") {
      setTodosRaw([
        ...todosRaw,
        {
          userId: 1,
          id,
          title,
          completed: false,
        },
      ]);
    }
    newIdRef.current.value = "";
    newTitleRef.current.value = "";
    handleClose();
  };

  return (
    <>
      {/* filter */}

      <Form>
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex align-items-center">
            <Form.Check // prettier-gnore
              type="switch"
              id="custom-switch"
              onChange={(e) => {
                setOnlyWaiting(e.target.checked);
              }}
            />
            <span style={{ color: "blue" }}>Show only</span>&nbsp;
            <Button variant="warning">
              Waiting <i class="bi bi-clock-fill"></i>
            </Button>
          </div>

          <Form.Select
            className="w-25"
            value={itemPerPage}
            onChange={(e) => {
              setItemPerpage(Number(e.target.value));
              setCurPage(1);
            }}
          >
            <option value={5}>5 items per page</option>
            <option value={10}>10 items per page</option>
            <option value={50}>50 items per page</option>
            <option value={100}>100 items per page</option>
          </Form.Select>
        </div>
      </Form>

      {/* table */}
      <div className="p-3">
        <Table striped bordered hover>
          <thead>
            <tr className="table-dark">
              <th style={{ width: "3rem" }}>ID</th>
              <th>Title</th>
              <th className="text-end" style={{ width: "12rem" }}>
                Completed&nbsp;
                <Button onClick={() => handleShow()}>+</Button>
              </th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => {
              return (
                <tr>
                  <td className="text-center">
                    <h6>
                      <Badge bg="secondary">{todo.id}</Badge>
                    </h6>
                  </td>
                  <td className="text-start">{todo.title}</td>
                  <td className="text-end">
                    {todo.completed ? (
                      <Badge bg="success" className="fs-5">
                        done <i className="bi bi-check"></i>
                      </Badge>
                    ) : (
                      <Button
                        variant="warning"
                        onClick={() => {
                          const updated = todosRaw.map((t) =>
                            t.id === todo.id ? { ...t, completed: true } : t
                          );
                          setTodosRaw(updated);
                        }}
                      >
                        Waiting <i className="bi bi-clock-fill"></i>
                      </Button>
                    )}
                    &nbsp;
                    <Button
                      variant="danger"
                      onClick={() => deleteTodo(todo.id)}
                    >
                      <i class="bi bi-trash-fill"></i>
                    </Button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </Table>
      </div>
      {/* page control */}
      <div className="text-center " style={{ color: "blue" }}>
        <Button
          variant="outline-dark"
          style={{ color: "blue", borderColor: "blue" }}
          onClick={() => setCurPage(1)}
          disabled={curPage === 1}
        >
          First
        </Button>
        &nbsp;
        <Button
          variant="outline-dark"
          style={{ color: "blue", borderColor: "blue" }}
          onClick={() => curPage > 1 && setCurPage((p) => p - 1)}
          disabled={curPage === 1}
        >
          Previous
        </Button>
        &nbsp;
        <span>
          {curPage}&nbsp;/&nbsp;{numPages}&nbsp;
        </span>
        <Button
          variant="outline-dark"
          style={{ color: "blue", borderColor: "blue" }}
          onClick={() => curPage < numPages && setCurPage((p) => p + 1)}
          disabled={curPage === numPages}
        >
          Next
        </Button>
        &nbsp;
        <Button
          variant="outline-dark"
          style={{ color: "blue", borderColor: "blue" }}
          onClick={() => setCurPage(numPages)}
          disabled={curPage === numPages}
        >
          Last
        </Button>
      </div>
      {/* Modal เพิ่มรายการ */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Add todo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>ID:</Form.Label>
              <Form.Control
                value={
                  todosRaw.reduce(
                    (maxId, todo) => Math.max(maxId, todo.id),
                    0
                  ) + 1
                }
                disabled={true}
                ref={newIdRef}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Title:</Form.Label>
              <Form.Control
                placeholder="New todo, here!!!"
                autoFocus
                ref={newTitleRef}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() =>
              saveClicked(
                Number(newIdRef.current.value),
                newTitleRef.current.value
              )
            }
          >
            Save
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default Todos;
