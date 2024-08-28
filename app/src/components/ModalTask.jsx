import { Button } from "./Button"
import { Input } from "./Input"
import { Label } from "./Label"

export const ModalTask = ({ handleAddTask, handleInputChange, setIsModalOpen, handleFileChange, imageName }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg w-96 p-6">
        <h2 className="text-xl font-semibold mb-4">Create a New Task</h2>
        <form onSubmit={handleAddTask} className="space-y-5">
          <div>
            <label htmlFor="title" className="font-medium">
              Title
            </label>
            <Input
              id="title"
              type="text"
              name="title"
              onChange={handleInputChange}
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-black shadow-sm rounded-lg"
            />
          </div>
          <div>
            <label htmlFor="description" className="font-medium">
              Description
            </label>
            <Input
              id="description"
              type="text"
              name="description"
              onChange={handleInputChange}
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-black shadow-sm rounded-lg"
            />
          </div>
          <div>
            <Label htmlFor="priority" className="font-medium">
              Priority
            </Label>
            <select
              id="priority"
              name="priority"
              onChange={handleInputChange}
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-black shadow-sm rounded-lg"
            >
              <option value="1">Low</option>
              <option value="2">Medium</option>
              <option value="3">High</option>
            </select>
          </div>
          <div>
            <Label htmlFor="statusTask" className="font-medium">
              Status
            </Label>
            <select
              id="statusTask"
              name="statusTask"
              onChange={handleInputChange}
              required
              className="w-full mt-2 px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-black shadow-sm rounded-lg"
            >
              <option value="pending">Pending</option>
              <option value="in progress">In Progress</option>
              <option value="completed">Completed</option>
            </select>
          </div>
          <div>
          <Label htmlFor="image" className="font-medium">
            Image
          </Label>
          <div className="relative mt-2">
            <input
              id="image"
              type="file"
              accept="image/*"
              className="hidden"
              name="image"
              onChange={handleFileChange}
            />
            <label
              htmlFor="image"
              className="flex items-center justify-between cursor-pointer w-full px-3 py-2 text-gray-500 bg-transparent outline-none border focus:border-black shadow-sm rounded-lg"
            >
              <span>{imageName}</span>
              <span className="text-sm font-medium text-black">
                Choose File
              </span>
            </label>
          </div>
        </div>
          <Button
            type="submit"
            className="inline-flex w-full h-9 items-center justify-center rounded-md bg-gray-900 px-4 py-2 text-sm font-medium text-gray-50 shadow transition-colors hover:bg-gray-900/90 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950"
            onClick={handleAddTask}
          >
            Create Task
          </Button>
        </form>
        <Button
          type="button"
          className="mt-4 inline-flex w-full h-9 items-center justify-center rounded-md bg-gray-300 px-4 py-2 text-sm font-medium text-gray-700 shadow transition-colors hover:bg-gray-400 focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-400"
          onClick={() => setIsModalOpen(false)}
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}