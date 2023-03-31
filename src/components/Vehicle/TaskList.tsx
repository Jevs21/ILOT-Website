import { Grid, Modal } from '@suid/material';
import { createSignal, For } from 'solid-js';
import CardEl from '../../elements/CardEl';
import ModalBoxEl from '../../elements/ModalBoxEl';
import { useGlobalContext } from '../../global/store';
import TaskListModal from './TaskListModal';
import TaskListNewRow from './TaskListNewRow';
import TaskListRow from './TaskListRow';


export function TaskList(props) {
  const { apiCall } = useGlobalContext();

  const [showModal, setShowModal] = createSignal(false);
  const [modalOperation, setModalOperation] = createSignal(0); // 0 - None, 1 - edit, 2 - create, 3 - delete
  const [curEditTask, setCurEditTask] = createSignal(null);

  const closeModal = (refresh=false) => {
    if (refresh) {
      // refetch();
      props.refreshData();
    }
    setShowModal(false);
    setModalOperation(0);
    setCurEditTask(-1);
  }

  const rowClicked = (e, task) => {
    if (!e.target.classList.contains("task_list_checkbox")) {
      setModalOperation(1);
      setCurEditTask(task);
      setShowModal(true);
      return;
    }
  }

  return (
    <CardEl>
      <Grid container item xs={12}>
        <For each={props.tasks}>
          {(task, i) => (
            <TaskListRow 
              task={task} 
              refetchTasks={props.refreshData} 
              v_id={props.v_id} 
              onClick={(e) => rowClicked(e, task)}
              isEven={(i() % 2 == 0)}/>
          )}
        </For>
        <TaskListNewRow 
          onClick={() => {
            setModalOperation(2);
            setCurEditTask({uuid: "", task: ""});
            setShowModal(true);
          }}
          isEven={(props.tasks.length % 2 == 0)}/>
      </Grid>
      <Modal 
        open={showModal()}
        onClose={closeModal}>
        <ModalBoxEl>
          <TaskListModal
            v_id={props.v_id} 
            task={curEditTask()} 
            operation={modalOperation()}
            closeModal={closeModal}/>
        </ModalBoxEl>
      </Modal>
    </CardEl>
  );
}
