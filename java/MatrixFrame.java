import javax.swing.*;

public class MatrixFrame extends JFrame {
    public MatrixFrame(int width, int height) {
        JPanel panel = new MatrixPanel(width, height);
        add(panel);

        setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
        setSize(width, height);
        setLocationRelativeTo(null);
        setVisible(true);
    }
}
