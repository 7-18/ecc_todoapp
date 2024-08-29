import { useEffect, useState } from "react";
import {
  getTasksImagesUserView,
  getTasksUserView,
} from "../services/httpClient";

export const useTasks = () => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getAllTasks = async () => {
      try {
        const response = await getTasksUserView();
        setTasks(response.data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    getAllTasks();
  }, []);

  return { tasks, loading, error };
};

export const useTaskUser = (user_id) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (user_id) {
      const getTasksByUserId = async () => {
        try {
          const response = await getTasksImagesUserView(user_id);
          setTasks(response.data);
        } catch (error) {
          setError(error);
        } finally {
          setLoading(false);
        }
      };
      getTasksByUserId();
    }
  }, [user_id]);

  return { tasks, loading, error };
};
