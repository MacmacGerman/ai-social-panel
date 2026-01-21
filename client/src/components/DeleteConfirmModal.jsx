import Modal from '../components/Modal'

function DeleteConfirmModal({ isOpen, onClose, onConfirm, itemName, itemType = 'post' }) {
    const handleConfirm = () => {
        if (window.addToast) {
            window.addToast(`${itemType} eliminado correctamente`, 'success')
        }
        onConfirm()
        onClose()
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Confirmar Eliminación" size="small">
            <div style={{ padding: 'var(--space-4) 0' }}>
                <p className="body" style={{ color: 'var(--text-secondary)', marginBottom: 'var(--space-6)' }}>
                    ¿Estás seguro de que deseas eliminar <strong>{itemName}</strong>? Esta acción no se puede deshacer.
                </p>

                <div className="form-actions" style={{ marginTop: 0, paddingTop: 0, borderTop: 'none' }}>
                    <button className="btn btn-glass" onClick={onClose}>
                        Cancelar
                    </button>
                    <button className="btn btn-danger" onClick={handleConfirm}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <polyline points="3 6 5 6 21 6" />
                            <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
                        </svg>
                        <span>Eliminar</span>
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default DeleteConfirmModal
