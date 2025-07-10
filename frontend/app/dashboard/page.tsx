"use client";
import { useState, useEffect } from "react";
import { API_URL } from "@/config/global";
import axios from "axios";

// Dummy user and task data for demonstration (now with _id and username)
const initialUsers = [
	{ _id: "u1", username: "Alice" },
	{ _id: "u2", username: "Bob" },
	{ _id: "u3", username: "Charlie" },
	{ _id: "u4", username: "David" },
];
const initialTasks = [
	{ id: 1, title: "Design Homepage", assignedTo: ["u1", "u2"] },
	{ id: 2, title: "API Integration", assignedTo: ["u3"] },
];

export default function Dashboard() {
	const [tasks, setTasks] = useState(initialTasks);
	const [users, setUsers] = useState(initialUsers);
	const [showCreate, setShowCreate] = useState(false);
	const [newTitle, setNewTitle] = useState("");
	const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
	const [filterUser, setFilterUser] = useState<string | null>(null);

	// Fetch all users from API
	useEffect(() => {
		const fetchUsers = async () => {
			try {
				const res = await axios.get(`${API_URL}/user/all`);
				setUsers(res.data);
			} catch (err) {
				console.error("Failed to fetch users", err);
			}
		};
		fetchUsers();
	}, []);

	// Fetch all tasks from API
	useEffect(() => {
		const fetchTasks = async () => {
			try {
				const res = await axios.get(`${API_URL}/task/all`);
				setTasks(res.data);
			} catch (err) {
				console.error("Failed to fetch tasks", err);
			}
		};
		fetchTasks();
	}, []);

	const handleCreateTask = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!newTitle.trim() || selectedUsers.length === 0) return;
		try {
			const res = await axios.post(`${API_URL}/task/create`, {
				title: newTitle,
				assignedTo: selectedUsers,
			});
			setTasks([...tasks, res.data]);
			setNewTitle("");
			setSelectedUsers([]);
			setShowCreate(false);
		} catch (err) {
			console.error("Failed to create task", err);
		}
	};

	const handleUserSelect = (userId: string) => {
		setSelectedUsers((prev) =>
			prev.includes(userId)
				? prev.filter((u) => u !== userId)
				: [...prev, userId]
		);
	};

	const handleFilterUser = (userId: string) => {
		setFilterUser((prev) => (prev === userId ? null : userId));
	};

	const filteredTasks = filterUser
		? tasks.filter((task) => task.assignedTo.includes(filterUser))
		: tasks;

	return (
		<div className="max-w-3xl mx-auto mt-16">
			<div className="flex justify-between items-center mb-8">
				<h1 className="text-3xl font-bold">Dashboard</h1>
				<div className="flex gap-2">
					<button
						className="btn btn-primary"
						onClick={() => setShowCreate(true)}
					>
						Create Task
					</button>
					<button
						className="btn btn-outline btn-error"
						onClick={() => {
							if (window.confirm("Are you sure you want to logout?")) {
								localStorage.removeItem("token");
								window.location.href = "/login";
							}
						}}
					>
						Logout
					</button>
				</div>
			</div>

			{/* All Users List */}
			<div className="mb-8">
				<h2 className="text-xl font-semibold mb-2">All Users</h2>
				<ul className="flex flex-wrap gap-4">
					{users.map((user) => (
						<li
							key={user._id}
							className={`badge badge-outline cursor-pointer ${
								filterUser === user._id
									? "badge-primary text-white"
									: ""
							}`}
							onClick={() => handleFilterUser(user._id)}
							title={user.username}
						>
							{user.username}
						</li>
					))}
				</ul>
				{filterUser && (
					<button
						className="btn btn-xs btn-ghost ml-2"
						onClick={() => setFilterUser(null)}
					>
						Clear Filter
					</button>
				)}
			</div>

			{/* Task List */}
			<div>
				<h2 className="text-xl font-semibold mb-2">Task List</h2>
				<ul className="space-y-4">
					{filteredTasks.map((task) => (
						<li
							key={task.id}
							className="p-4 bg-base-200 rounded shadow flex justify-between items-center"
						>
							<div>
								<div className="font-medium">{task.title}</div>
								<div className="text-sm mt-1">
									Assigned to:{" "}
									{task.assignedTo.map((uid) => {
										const user = users.find((u) => u._id === uid);
										return user ? (
											<span
												key={uid}
												className="badge badge-info mr-2"
											>
												{user.username}
											</span>
										) : null;
									})}
								</div>
							</div>
							<div className="flex gap-2">
								<button
									className="btn btn-sm btn-outline"
									// onClick={...} // Add update logic here
								>
									Update
								</button>
								<button
									className="btn btn-sm btn-error"
									onClick={() =>
										setTasks(tasks.filter((t) => t.id !== task.id))
									}
								>
									Delete
								</button>
							</div>
						</li>
					))}
				</ul>
			</div>

			{/* Create Task Modal */}
			{showCreate && (
				<div className="fixed inset-0 bg-black bg-opacity-30 flex items-center justify-center z-50">
					<div className="bg-base-100 p-6 rounded shadow-lg w-96">
						<h3 className="text-lg font-bold mb-4">Create New Task</h3>
						<form onSubmit={handleCreateTask}>
							<input
								type="text"
								className="input input-bordered w-full mb-4"
								placeholder="Task Title"
								value={newTitle}
								onChange={(e) => setNewTitle(e.target.value)}
								required
							/>
							<div className="mb-4">
								<div className="font-medium mb-2">Assign Users</div>
								<div className="flex flex-wrap gap-2">
									{users.map((user) => (
										<label
											key={user._id}
											className="cursor-pointer flex items-center gap-1"
										>
											<input
												type="checkbox"
												checked={selectedUsers.includes(user._id)}
												onChange={() => handleUserSelect(user._id)}
												className="checkbox checkbox-sm"
											/>
											<span>{user.username}</span>
										</label>
									))}
								</div>
							</div>
							<div className="flex justify-end gap-2">
								<button
									type="button"
									className="btn btn-ghost"
									onClick={() => setShowCreate(false)}
								>
									Cancel
								</button>
								<button type="submit" className="btn btn-primary">
									Create
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}